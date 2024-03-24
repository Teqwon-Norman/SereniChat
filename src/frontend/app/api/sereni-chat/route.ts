import OpenAI from 'openai';

import { NextResponse } from 'next/server';

/**
 * 
 * @param {object} request - The request object containing user, system, ad assistant messages.
 *  
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user, system, assistant } = body;
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

    } catch (error: any) {
        console.log(error, 'ERROR_OPENAI');
        return new NextResponse('Internal Error', { status: 500 });
    }
}