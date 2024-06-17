'use server';

import { cookies } from 'next/headers';

export default async function logout() {
  cookies().set('logged-in', 'false');
}
