// popup.js

const listEl      = document.getElementById('tab-list');
const footerText  = document.getElementById('footer-text');
const tabCount    = document.getElementById('tab-count');
const lastBtn     = document.getElementById('reopen-last-btn');
const clearBtn    = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');
const settingsBtn = document.getElementById('settings-btn');

let IS_INCOGNITO = false;
let allTabs = [];
let T = null;   // traduzioni correnti

// ── Utilità ───────────────────────────────────────────────────────────────────

function timeAgo(ts) {
    const s = Math.round((Date.now() - ts) / 1000);
    if (s < 60)    return `${s}s fa`;
    if (s < 3600)  return `${Math.floor(s / 60)}m fa`;
    return `${Math.floor(s / 3600)}h fa`;
}

function hostname(url) {
    try { return new URL(url).hostname; } catch { return url; }
}

// ── Applica traduzioni all'UI ─────────────────────────────────────────────────

function applyTranslations() {
    if (!T) return;
    clearBtn.textContent            = T.clear;
    lastBtn.textContent             = T.reopenLast;
    searchInput.placeholder         = T.searchPlaceholder;
    document.querySelector('.hd-title').textContent = T.title;
    if (IS_INCOGNITO) {
        document.querySelector('.hd-count').textContent = T.incognito;
    }
}

// ── Render lista ──────────────────────────────────────────────────────────────

function render(tabs) {
    listEl.innerHTML = '';

    if (!tabs || tabs.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '40'); svg.setAttribute('height', '40');
        svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '1.5');
        svg.innerHTML = '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/>';
        const msg = document.createElement('p');
        msg.textContent = T ? T.noTabs : '—';
        empty.appendChild(svg);
        empty.appendChild(msg);
        listEl.appendChild(empty);

        lastBtn.disabled = true;
        tabCount.textContent = '0';
        footerText.textContent = T ? T.noTabsFooter : '';
        return;
    }

    lastBtn.disabled = false;
    tabCount.textContent = String(allTabs.length);
    footerText.textContent = T
        ? (IS_INCOGNITO ? T.sessionIncognito(allTabs.length) : T.sessionNormal(allTabs.length))
        : '';

    [...tabs].reverse().forEach(tab => {
        const item = document.createElement('div');
        item.className = 'tab-item';

        const favicon  = document.createElement('img');
        favicon.className = 'tab-favicon';
        const fallback = document.createElement('div');
        fallback.className = 'tab-favicon-fallback';
        fallback.textContent = '🌐';

        if (tab.favIconUrl) {
            favicon.src = tab.favIconUrl;
            fallback.style.display = 'none';
            favicon.addEventListener('error', () => {
                favicon.style.display = 'none';
                fallback.style.display = 'flex';
            });
        } else {
            favicon.style.display = 'none';
        }

        const info    = document.createElement('div');
        info.className = 'tab-info';
        const titleEl = document.createElement('div');
        titleEl.className = 'tab-title';
        titleEl.textContent = tab.title || hostname(tab.url);
        const hostEl  = document.createElement('div');
        hostEl.className = 'tab-host';
        hostEl.textContent = hostname(tab.url);
        info.appendChild(titleEl);
        info.appendChild(hostEl);

        const right   = document.createElement('div');
        right.className = 'tab-right';
        const timeEl  = document.createElement('span');
        timeEl.className = 'tab-time';
        timeEl.textContent = timeAgo(tab.closedAt);
        const restore = document.createElement('span');
        restore.className = 'tab-restore';
        restore.textContent = T ? T.reopen : 'Riapri ↩';
        right.appendChild(timeEl);
        right.appendChild(restore);

        item.appendChild(favicon);
        item.appendChild(fallback);
        item.appendChild(info);
        item.appendChild(right);

        item.addEventListener('click', () => {
            chrome.runtime.sendMessage({
                action: 'reopenByClosedAt',
                closedAt: tab.closedAt,
                incognito: IS_INCOGNITO
            });
            window.close();
        });

        listEl.appendChild(item);
    });
}

function applyFilter() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { render(allTabs); return; }
    render(allTabs.filter(t =>
        (t.title || '').toLowerCase().includes(q) ||
        (t.url   || '').toLowerCase().includes(q)
    ));
}

// ── Carica dati ───────────────────────────────────────────────────────────────

function loadTabs() {
    chrome.runtime.sendMessage(
        { action: 'getClosedTabs', incognito: IS_INCOGNITO },
        resp => {
            if (chrome.runtime.lastError) {
                footerText.textContent = T ? T.errorComm : 'Errore.';
                return;
            }
            allTabs = (resp && resp.tabs) ? resp.tabs : [];
            applyFilter();
        }
    );
}

// ── Init ──────────────────────────────────────────────────────────────────────

async function init() {
    T = await getT();

    chrome.windows.getCurrent(win => {
        IS_INCOGNITO = win ? win.incognito : false;
        if (IS_INCOGNITO) {
            document.body.classList.add('incognito');
            const hdSvg = document.querySelector('.hd-icon svg');
            if (hdSvg) hdSvg.setAttribute('stroke', '#818cf8');
        }
        applyTranslations();
        loadTabs();
    });
}

// ── Pulsanti ──────────────────────────────────────────────────────────────────

lastBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'reopenLast', incognito: IS_INCOGNITO });
    window.close();
});

clearBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'clearAll', incognito: IS_INCOGNITO });
    allTabs = [];
    applyFilter();
});

searchInput.addEventListener('input', applyFilter);

settingsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
});

// ── Live update ───────────────────────────────────────────────────────────────

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'session') return;
    const key = IS_INCOGNITO ? 'closedTabs_incognito' : 'closedTabs_normal';
    if (changes[key]) {
        allTabs = changes[key].newValue || [];
        applyFilter();
    }
});

init();
