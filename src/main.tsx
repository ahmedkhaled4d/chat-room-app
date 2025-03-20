import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import global_en from "./i18n/en/global.json";
import global_ar from "./i18n/ar/global.json";

const container = document.getElementById("root");
const root = createRoot(container!);

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    ar: {
      global: global_ar,
    },
  },
});
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
