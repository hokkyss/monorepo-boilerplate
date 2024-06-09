'use server';

// eslint-disable-next-line unused-imports/no-unused-vars
export default async function sendForm(_state: {}, _formData: FormData) {
  await new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      resolve();
      clearTimeout(timeout);
    }, 2000);
  });

  return {};
}
