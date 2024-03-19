'use server';

import { getServerSession } from 'next-auth';

import authOptions from '../modules/config/auth/authOptions';

export default async function getSession() {
    return await getServerSession(authOptions);
}