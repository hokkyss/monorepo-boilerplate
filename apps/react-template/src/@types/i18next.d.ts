import 'i18next';

declare module 'i18next' {
  interface LanguageResource {}

  interface CustomTypeOptions {
    contextSeparator: '_';
    defaultNS: keyof LanguageResource;
    fallbackLng: false;
    fallbackNS: false;
    interpolationPrefix: '{{';
    interpolationSuffix: '}}';
    jsonFormat: 'v4';
    keySeparator: '.';
    ns: (keyof LanguageResource)[];
    nsSeparator: ':';
    pluralSeparator: '_';
    resources: LanguageResource;
    returnNull: false;
  }
}
