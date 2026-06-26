// i18n.js — dizionario traduzioni, condiviso tra popup e options

const TRANSLATIONS = {
    it: {
        title:           'Schede chiuse',
        incognito:       'Incognito',
        clear:           'Cancella',
        reopenLast:      '↩ Riapri ultima',
        searchPlaceholder: 'Cerca nelle schede chiuse…',
        reopen:          'Riapri ↩',
        noTabs:          'Nessuna scheda chiusa in questa sessione',
        sessionNormal:   (n) => `${n} scheda${n !== 1 ? 'e' : ''} in sessione`,
        sessionIncognito:(n) => `${n} scheda${n !== 1 ? 'e' : ''} in sessione incognito`,
        noTabsFooter:    'Nessuna scheda',
        errorComm:       'Errore di comunicazione.',
        // options
        optTitle:        'Impostazioni',
        optLanguage:     'Lingua',
        optLangAuto:     'Automatica (sistema)',
        optPrivacy:      'Privacy',
        optAbout:        'Informazioni',
        optSave:         'Salva',
        optSaved:        'Salvato ✓',
        privacyText:     `Questa estensione non raccoglie, non trasmette e non condivide alcun dato. Tutto viene conservato esclusivamente nella memoria della sessione del browser (chrome.storage.session), che viene cancellata automaticamente alla chiusura del browser. Le schede incognito vengono dimenticate alla chiusura di tutte le finestre in incognito. Nessuna chiamata di rete viene effettuata.`,
        aboutText:       `Riapri Ultima Scheda è un'estensione open source leggera e senza dipendenze. Sviluppata con Manifest V3. Creata da Skaonline / MimaApp.`,
        aboutGithub:     'Vedi su GitHub',
    },
    en: {
        title:           'Closed tabs',
        incognito:       'Incognito',
        clear:           'Clear',
        reopenLast:      '↩ Reopen last',
        searchPlaceholder: 'Search closed tabs…',
        reopen:          'Reopen ↩',
        noTabs:          'No closed tabs in this session',
        sessionNormal:   (n) => `${n} tab${n !== 1 ? 's' : ''} in session`,
        sessionIncognito:(n) => `${n} tab${n !== 1 ? 's' : ''} in incognito session`,
        noTabsFooter:    'No tabs',
        errorComm:       'Communication error.',
        optTitle:        'Settings',
        optLanguage:     'Language',
        optLangAuto:     'Automatic (system)',
        optPrivacy:      'Privacy',
        optAbout:        'About',
        optSave:         'Save',
        optSaved:        'Saved ✓',
        privacyText:     `This extension does not collect, transmit, or share any data. Everything is stored exclusively in the browser's session memory (chrome.storage.session), which is automatically cleared when the browser is closed. Incognito tabs are forgotten when all incognito windows are closed. No network requests are made.`,
        aboutText:       `Reopen Last Tab is a lightweight, dependency-free open source extension. Built with Manifest V3. Created by Skaonline / MimaApp.`,
        aboutGithub:     'View on GitHub',
    },
    es: {
        title:           'Pestañas cerradas',
        incognito:       'Incógnito',
        clear:           'Limpiar',
        reopenLast:      '↩ Reabrir última',
        searchPlaceholder: 'Buscar pestañas cerradas…',
        reopen:          'Reabrir ↩',
        noTabs:          'No hay pestañas cerradas en esta sesión',
        sessionNormal:   (n) => `${n} pestaña${n !== 1 ? 's' : ''} en sesión`,
        sessionIncognito:(n) => `${n} pestaña${n !== 1 ? 's' : ''} en sesión incógnito`,
        noTabsFooter:    'Sin pestañas',
        errorComm:       'Error de comunicación.',
        optTitle:        'Ajustes',
        optLanguage:     'Idioma',
        optLangAuto:     'Automático (sistema)',
        optPrivacy:      'Privacidad',
        optAbout:        'Acerca de',
        optSave:         'Guardar',
        optSaved:        'Guardado ✓',
        privacyText:     `Esta extensión no recopila, transmite ni comparte ningún dato. Todo se almacena exclusivamente en la memoria de sesión del navegador (chrome.storage.session), que se borra automáticamente al cerrar el navegador. Las pestañas de incógnito se olvidan al cerrar todas las ventanas de incógnito. No se realizan solicitudes de red.`,
        aboutText:       `Reabrir Última Pestaña es una extensión de código abierto ligera y sin dependencias. Construida con Manifest V3. Creada por Skaonline / MimaApp.`,
        aboutGithub:     'Ver en GitHub',
    },
    fr: {
        title:           'Onglets fermés',
        incognito:       'Incognito',
        clear:           'Effacer',
        reopenLast:      '↩ Rouvrir dernier',
        searchPlaceholder: 'Rechercher dans les onglets fermés…',
        reopen:          'Rouvrir ↩',
        noTabs:          'Aucun onglet fermé dans cette session',
        sessionNormal:   (n) => `${n} onglet${n !== 1 ? 's' : ''} en session`,
        sessionIncognito:(n) => `${n} onglet${n !== 1 ? 's' : ''} en session incognito`,
        noTabsFooter:    'Aucun onglet',
        errorComm:       'Erreur de communication.',
        optTitle:        'Paramètres',
        optLanguage:     'Langue',
        optLangAuto:     'Automatique (système)',
        optPrivacy:      'Confidentialité',
        optAbout:        'À propos',
        optSave:         'Enregistrer',
        optSaved:        'Enregistré ✓',
        privacyText:     `Cette extension ne collecte, ne transmet et ne partage aucune donnée. Tout est stocké exclusivement dans la mémoire de session du navigateur (chrome.storage.session), effacée automatiquement à la fermeture du navigateur. Les onglets incognito sont oubliés à la fermeture de toutes les fenêtres incognito. Aucune requête réseau n'est effectuée.`,
        aboutText:       `Rouvrir Dernier Onglet est une extension open source légère et sans dépendances. Construite avec Manifest V3. Créée par Skaonline / MimaApp.`,
        aboutGithub:     'Voir sur GitHub',
    },
    de: {
        title:           'Geschlossene Tabs',
        incognito:       'Inkognito',
        clear:           'Löschen',
        reopenLast:      '↩ Letzten öffnen',
        searchPlaceholder: 'Geschlossene Tabs suchen…',
        reopen:          'Öffnen ↩',
        noTabs:          'Keine geschlossenen Tabs in dieser Sitzung',
        sessionNormal:   (n) => `${n} Tab${n !== 1 ? 's' : ''} in Sitzung`,
        sessionIncognito:(n) => `${n} Tab${n !== 1 ? 's' : ''} in Inkognito-Sitzung`,
        noTabsFooter:    'Keine Tabs',
        errorComm:       'Kommunikationsfehler.',
        optTitle:        'Einstellungen',
        optLanguage:     'Sprache',
        optLangAuto:     'Automatisch (System)',
        optPrivacy:      'Datenschutz',
        optAbout:        'Über',
        optSave:         'Speichern',
        optSaved:        'Gespeichert ✓',
        privacyText:     `Diese Erweiterung erfasst, überträgt oder teilt keine Daten. Alles wird ausschließlich im Sitzungsspeicher des Browsers (chrome.storage.session) gespeichert, der beim Schließen des Browsers automatisch gelöscht wird. Inkognito-Tabs werden vergessen, wenn alle Inkognito-Fenster geschlossen sind. Es werden keine Netzwerkanfragen gestellt.`,
        aboutText:       `Letzten Tab Wiederherstellen ist eine leichtgewichtige Open-Source-Erweiterung ohne Abhängigkeiten. Erstellt mit Manifest V3. Erstellt von Skaonline / MimaApp.`,
        aboutGithub:     'Auf GitHub ansehen',
    },
};

// Mappa codici lingua browser → nostri codici
const LANG_MAP = { it: 'it', en: 'en', es: 'es', fr: 'fr', de: 'de' };

function detectSystemLang() {
    const raw = (chrome.i18n.getUILanguage() || 'en').split('-')[0].toLowerCase();
    return LANG_MAP[raw] || 'en';
}

async function getLang() {
    const data = await chrome.storage.sync.get('language');
    const saved = data.language;
    if (saved && saved !== 'auto' && TRANSLATIONS[saved]) return saved;
    return detectSystemLang();
}

async function getT() {
    const lang = await getLang();
    return TRANSLATIONS[lang];
}
