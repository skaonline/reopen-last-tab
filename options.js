// options.js

const PRIVACY_POINTS = {
    it: [
        'Nessun dato viene raccolto, trasmesso o condiviso con terze parti.',
        'Tutto è conservato solo nella memoria di sessione (chrome.storage.session): si cancella automaticamente alla chiusura del browser.',
        'Le schede incognito vengono dimenticate alla chiusura di tutte le finestre incognito.',
        'Nessuna chiamata di rete viene effettuata.',
    ],
    en: [
        'No data is collected, transmitted, or shared with third parties.',
        'Everything is stored only in session memory (chrome.storage.session): automatically cleared when the browser is closed.',
        'Incognito tabs are forgotten when all incognito windows are closed.',
        'No network requests are made.',
    ],
    es: [
        'Ningún dato es recopilado, transmitido o compartido con terceros.',
        'Todo se almacena solo en la memoria de sesión (chrome.storage.session): se borra automáticamente al cerrar el navegador.',
        'Las pestañas de incógnito se olvidan al cerrar todas las ventanas de incógnito.',
        'No se realizan solicitudes de red.',
    ],
    fr: [
        'Aucune donnée n\'est collectée, transmise ou partagée avec des tiers.',
        'Tout est stocké uniquement en mémoire de session (chrome.storage.session) : effacé automatiquement à la fermeture du navigateur.',
        'Les onglets incognito sont oubliés à la fermeture de toutes les fenêtres incognito.',
        'Aucune requête réseau n\'est effectuée.',
    ],
    de: [
        'Es werden keine Daten erfasst, übertragen oder mit Dritten geteilt.',
        'Alles wird nur im Sitzungsspeicher gespeichert (chrome.storage.session): wird beim Schließen des Browsers automatisch gelöscht.',
        'Inkognito-Tabs werden vergessen, wenn alle Inkognito-Fenster geschlossen sind.',
        'Es werden keine Netzwerkanfragen gestellt.',
    ],
};

const GITHUB_URL = 'https://github.com/skaonline/reopen-last-tab';

let selectedLang = 'auto';

async function applyTranslations(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    const points = PRIVACY_POINTS[lang] || PRIVACY_POINTS['en'];

    document.getElementById('opt-title').textContent       = t.optTitle;
    document.getElementById('opt-lang-label').textContent  = t.optLanguage;
    document.getElementById('label-auto').textContent      = t.optLangAuto;
    document.getElementById('opt-privacy-label').textContent = t.optPrivacy;
    document.getElementById('opt-about-label').textContent = t.optAbout;
    document.getElementById('save-btn').textContent        = t.optSave;
    document.getElementById('github-label').textContent   = t.aboutGithub;
    document.getElementById('about-text').textContent      = t.aboutText;
    document.getElementById('priv-1').textContent = points[0];
    document.getElementById('priv-2').textContent = points[1];
    document.getElementById('priv-3').textContent = points[2];
    document.getElementById('priv-4').textContent = points[3];
}

async function init() {
    // Link GitHub
    document.getElementById('github-link').href = GITHUB_URL;

    // Leggi lingua salvata
    const data = await chrome.storage.sync.get('language');
    selectedLang = data.language || 'auto';

    // Segna opzione selezionata
    document.querySelectorAll('.lang-option').forEach(el => {
        el.classList.toggle('selected', el.dataset.lang === selectedLang);
    });

    // Applica traduzioni con la lingua effettiva
    const effectiveLang = (selectedLang === 'auto' || !TRANSLATIONS[selectedLang])
        ? detectSystemLang()
        : selectedLang;
    await applyTranslations(effectiveLang);
}

// Click sulle opzioni lingua
document.querySelectorAll('.lang-option').forEach(el => {
    el.addEventListener('click', async () => {
        selectedLang = el.dataset.lang;
        document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');

        // Preview immediata
        const preview = (selectedLang === 'auto' || !TRANSLATIONS[selectedLang])
            ? detectSystemLang()
            : selectedLang;
        await applyTranslations(preview);
    });
});

// Salva
document.getElementById('save-btn').addEventListener('click', async () => {
    await chrome.storage.sync.set({ language: selectedLang });
    const statusEl = document.getElementById('status-msg');
    const effectiveLang = (selectedLang === 'auto' || !TRANSLATIONS[selectedLang])
        ? detectSystemLang()
        : selectedLang;
    const t = TRANSLATIONS[effectiveLang] || TRANSLATIONS['en'];
    statusEl.textContent = t.optSaved;
    statusEl.style.opacity = '1';
    setTimeout(() => { statusEl.style.opacity = '0'; }, 2000);
});

init();
