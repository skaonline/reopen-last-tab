🌍 Read in: [English](#-reopen-last-tab) | [Italiano](#-riapri-ultima-scheda)

---

# 🔄 Reopen Last Tab

> A lightweight Chrome extension that keeps track of closed tabs and lets you reopen them easily — without saving anything after closing the browser.

**Available for:** Chrome · Edge · Brave · Opera · any Chromium-based browser

---

## ✨ Features

- 📋 **Closed tabs list** — popup with all tabs closed in the current session, from newest to oldest
- 🖱️ **One-click reopen** — click on any tab in the list to restore it
- ⌨️ **Keyboard shortcut** — `Alt+Shift+Z` reopens the last closed tab without opening the popup
- 🔍 **Search** — filter tabs by title or URL directly inside the popup
- 🔢 **Badge counter** — the icon shows how many closed tabs are available
- 🕵️ **Separate Incognito** — normal and incognito sessions are completely independent and never mix
- 🌍 **Multilingual** — English, Italian, Spanish, French, German (auto-detected from browser language)
- ⚙️ **Options page** — language settings, privacy notes, extension info

---

## 🔒 Privacy

This extension is built with privacy at its core:

| What | How |
|---|---|
| Collected data | **None** |
| Data sent to third parties | **Never** |
| Where tabs are saved | Only in `chrome.storage.session` (browser's RAM) |
| After closing the browser | Everything is automatically forgotten |
| After closing incognito windows | Incognito tabs are immediately forgotten |
| Network calls | **None** |

---

## 🛠️ Installation (Developer Mode)

The extension is not yet on the Chrome Web Store. To install it:

1. Click the green **Code** button → **Download ZIP** and extract the folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** in the top right corner
4. Click **Load unpacked** and select the extracted folder
5. You're done — the icon will appear in your toolbar

> **Edge / Brave / Opera:** the process is identical, just change the extensions page URL (`edge://extensions/`, `brave://extensions/`, etc.)

---

## ⌨️ Keyboard Shortcut

The default shortcut is **`Alt+Shift+Z`**.

To customize it, go to: `chrome://extensions/shortcuts`

---

## 🗂️ Project Structure

```text
├── manifest.json       # Extension config (Manifest V3)
├── background.js       # Service worker: tracks and saves closed tabs
├── popup.html          # Popup UI
├── popup.js            # Popup logic
├── options.html        # Settings page
├── options.js          # Settings logic
├── i18n.js             # Multilingual translations
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## 🧱 Technologies

- **Manifest V3** — current standard for Chrome extensions
- **`chrome.storage.session`** — session memory, zero persistence
- **No external dependencies** — zero libraries, zero frameworks, pure Vanilla JS

---

## 👤 Author

Created by **Skaonline / MimaApp** — https://github.com/skaonline/

---

## 📄 License

[MIT](LICENSE) — free to use, modify, and distribute.

<br><br><br>

---
---

# 🔄 Riapri Ultima Scheda

> Un'estensione leggera per Chrome che tiene traccia delle schede chiuse e ti permette di riaprirle facilmente — senza salvare nulla dopo la chiusura del browser.

**Disponibile per:** Chrome · Edge · Brave · Opera · qualsiasi browser basato su Chromium

---

## ✨ Funzionalità

- 📋 **Lista delle schede chiuse** — popup con tutte le schede chiuse nella sessione corrente, dalla più recente alla meno recente
- 🖱️ **Riapri con un clic** — clicca su qualsiasi scheda nella lista per riaprirla
- ⌨️ **Scorciatoia da tastiera** — `Alt+Shift+Z` riapre l'ultima scheda chiusa senza aprire il popup
- 🔍 **Ricerca** — filtra le schede per titolo o URL direttamente nel popup
- 🔢 **Badge numerico** — l'icona mostra quante schede sono disponibili
- 🕵️ **Incognito separato** — sessione normale e incognito sono completamente indipendenti e non si mescolano mai
- 🌍 **Multilingua** — italiano, inglese, spagnolo, francese, tedesco (rilevamento automatico dalla lingua del browser)
- ⚙️ **Pagina impostazioni** — lingua, note sulla privacy, informazioni sull'estensione

---

## 🔒 Privacy

Questa estensione è progettata con la privacy al centro:

| Cosa | Come |
|---|---|
| Dati raccolti | **Nessuno** |
| Dati trasmessi a terze parti | **Mai** |
| Dove vengono salvate le schede | Solo in `chrome.storage.session` (memoria RAM del browser) |
| Dopo la chiusura del browser | Tutto viene dimenticato automaticamente |
| Dopo la chiusura delle finestre incognito | Le schede incognito vengono dimenticate |
| Chiamate di rete | **Nessuna** |

---

## 🛠️ Installazione (Modalità Sviluppatore)

L'estensione non è ancora sul Chrome Web Store. Per installarla:

1. Clicca sul pulsante verde **Code** → **Download ZIP** e decomprimi la cartella
2. Apri Chrome e vai su `chrome://extensions/`
3. Attiva la **Modalità sviluppatore** in alto a destra
4. Clicca su **Carica estensione non pacchettizzata** e seleziona la cartella decompressa
5. L'estensione è pronta — l'icona apparirà nella barra degli strumenti

> **Edge / Brave / Opera:** il procedimento è identico, cambia solo l'URL della pagina estensioni (`edge://extensions/`, `brave://extensions/`, ecc.)

---

## ⌨️ Scorciatoia da tastiera

La scorciatoia predefinita è **`Alt+Shift+Z`**.

Per personalizzarla: `chrome://extensions/shortcuts`

---

## 🗂️ Struttura del progetto

```text
├── manifest.json       # Configurazione estensione (Manifest V3)
├── background.js       # Service worker: traccia e salva le schede chiuse
├── popup.html          # Interfaccia del popup
├── popup.js            # Logica del popup
├── options.html        # Pagina impostazioni
├── options.js          # Logica impostazioni
├── i18n.js             # Traduzioni multilingua
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## 🧱 Tecnologie

- **Manifest V3** — standard attuale per le estensioni Chrome
- **`chrome.storage.session`** — memoria di sessione, nessuna persistenza
- **Nessuna dipendenza esterna** — zero librerie, zero framework, JS puro

---

## 👤 Autore

Creato da **Skaonline / MimaApp** — https://github.com/skaonline/

---

## 📄 Licenza

[MIT](LICENSE) — libero di usare, modificare e distribuire.
