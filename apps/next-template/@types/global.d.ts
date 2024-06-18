import type languageResource from '../configs/i18n/translations/en.translation.json';

type Messages = typeof languageResource;

declare global {
  interface IntlMessages extends Messages {}
}

export {};
