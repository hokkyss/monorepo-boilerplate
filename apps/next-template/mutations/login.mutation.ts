'use server';

import { cookies } from 'next/headers';

export default async function login() {
  cookies().set('logged-in', 'true');
}
