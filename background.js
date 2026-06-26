// background.js v4

const MAX_HISTORY = 50;

function tabsKey(incognito) { return incognito ? 'closedTabs_incognito' : 'closedTabs_normal'; }
function cacheKey(incognito) { return incognito ? 'tabCache_incognito'  : 'tabCache_normal';  }

function isInternalUrl(url) {
    return !url ||
        url.startsWith('chrome://') ||
        url.startsWith('chrome-extension://') ||
        url.startsWith('edge://') ||
        url.startsWith('about:');
}

// ── Cache URL schede attive ───────────────────────────────────────────────────
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (!tab.url || isInternalUrl(tab.url)) return;
    const key = cacheKey(tab.incognito);
    const data = await chrome.storage.session.get(key);
    const cache = data[key] || {};
    cache[tabId] = {
        url: tab.url,
        title: tab.title || tab.url,
        favIconUrl: tab.favIconUrl || '',
        incognito: tab.incognito
    };
    await chrome.storage.session.set({ [key]: cache });
});

// ── Scheda chiusa: salva nella lista ─────────────────────────────────────────
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
    for (const incognito of [false, true]) {
        const ck = cacheKey(incognito);
        const tk = tabsKey(incognito);
        const data = await chrome.storage.session.get([ck, tk]);
        const cache = data[ck] || {};
        if (!cache[tabId]) continue;

        const entry = cache[tabId];
        let closedTabs = data[tk] || [];
        closedTabs.push({ ...entry, closedAt: Date.now() });
        if (closedTabs.length > MAX_HISTORY) closedTabs = closedTabs.slice(-MAX_HISTORY);

        delete cache[tabId];
        await chrome.storage.session.set({ [ck]: cache, [tk]: closedTabs });
        updateBadge(closedTabs.length, incognito);
        break;
    }
});

// ── Tutte le finestre incognito chiuse → dimentica le schede incognito ────────
chrome.windows.onRemoved.addListener(async (windowId) => {
    // Controlla se esistono ancora finestre incognito aperte
    const windows = await chrome.windows.getAll({ windowTypes: ['normal'] });
    const anyIncognito = windows.some(w => w.incognito);
    if (!anyIncognito) {
        await chrome.storage.session.set({
            closedTabs_incognito: [],
            tabCache_incognito: {}
        });
        updateBadge(0, true);
    }
});

// ── Apre nella finestra con la modalità giusta ────────────────────────────────
async function openTabInCorrectWindow(url, incognito) {
    const windows = await chrome.windows.getAll({ windowTypes: ['normal'] });
    const target  = windows.find(w => w.incognito === incognito);
    if (target) {
        chrome.tabs.create({ url, windowId: target.id });
    } else {
        chrome.windows.create({ url, incognito });
    }
}

// ── Riapri ultima ─────────────────────────────────────────────────────────────
async function reopenLast(incognito) {
    const key  = tabsKey(incognito);
    const data = await chrome.storage.session.get(key);
    let tabs   = data[key] || [];
    if (tabs.length === 0) return;
    const last = tabs.pop();
    await chrome.storage.session.set({ [key]: tabs });
    updateBadge(tabs.length, incognito);
    await openTabInCorrectWindow(last.url, incognito);
}

// ── Riapri per timestamp ──────────────────────────────────────────────────────
async function reopenByClosedAt(closedAt, incognito) {
    const key  = tabsKey(incognito);
    const data = await chrome.storage.session.get(key);
    let tabs   = data[key] || [];
    const idx  = tabs.findIndex(t => t.closedAt === closedAt);
    if (idx === -1) return;
    const [entry] = tabs.splice(idx, 1);
    await chrome.storage.session.set({ [key]: tabs });
    updateBadge(tabs.length, incognito);
    await openTabInCorrectWindow(entry.url, incognito);
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function updateBadge(count, incognito) {
    chrome.action.setBadgeText({ text: count > 0 ? String(count) : '' });
    chrome.action.setBadgeBackgroundColor({ color: incognito ? '#6366f1' : '#4f46e5' });
}

// ── Scorciatoia ───────────────────────────────────────────────────────────────
chrome.commands.onCommand.addListener(async (command) => {
    if (command !== 'reopen-last-tab') return;
    const win = await chrome.windows.getCurrent();
    if (win) reopenLast(win.incognito);
});

// ── Menu contestuale ──────────────────────────────────────────────────────────
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({ id: 'reopen-last',   title: 'Riapri ultima scheda',      contexts: ['action'] });
    chrome.contextMenus.create({ id: 'clear-history', title: 'Cancella cronologia sessione', contexts: ['action'] });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    const win = await chrome.windows.getCurrent();
    const incognito = win ? win.incognito : false;
    if (info.menuItemId === 'reopen-last') {
        reopenLast(incognito);
    } else if (info.menuItemId === 'clear-history') {
        await chrome.storage.session.set({ [tabsKey(incognito)]: [] });
        updateBadge(0, incognito);
    }
});

// ── Messaggi dal popup ────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    (async () => {
        const incognito = !!msg.incognito;
        if (msg.action === 'getClosedTabs') {
            const data = await chrome.storage.session.get(tabsKey(incognito));
            sendResponse({ tabs: data[tabsKey(incognito)] || [] });
        } else if (msg.action === 'reopenLast') {
            await reopenLast(incognito);
            sendResponse({ ok: true });
        } else if (msg.action === 'reopenByClosedAt') {
            await reopenByClosedAt(msg.closedAt, incognito);
            sendResponse({ ok: true });
        } else if (msg.action === 'clearAll') {
            await chrome.storage.session.set({ [tabsKey(incognito)]: [] });
            updateBadge(0, incognito);
            sendResponse({ ok: true });
        }
    })();
    return true;
});
