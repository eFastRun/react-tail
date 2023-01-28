import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
const { ipcRenderer } = window.require('electron');

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const path = require("path");
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV === "development";
const prependPath = isMac && !isDev ? path.join(process.resourcesPath, "..") : ".";

const localesPath = isDev ? "." : __dirname;

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-electron-language-detector
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath: path.join(localesPath, "/locales/{{lng}}/{{ns}}.json"),
      addPath: path.join(localesPath, "/locales/{{lng}}/{{ns}}.missing.json"),
      ipcRenderer: ipcRenderer
    },
    saveMissing: true,
    saveMissingTo: 'current',
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
