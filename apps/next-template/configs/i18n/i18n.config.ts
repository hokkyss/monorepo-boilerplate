import { getRequestConfig, unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export enum Language {
  EN = 'en',
  ID = 'id',
  JA = 'ja',
}

export { setRequestLocale };

const localeConfig = getRequestConfig(async (params) => {
  const { locale } = params;

  try {
    // Validate that the incoming `locale` parameter is valid
    if (Object.values<string>(Language).includes(locale)) {
      return {
        messages: (await import(`./translations/${locale}.translation.json`)).default,
      };
    }

    throw new Error('');
  } catch {
    return notFound();
  }
});

export default localeConfig;
