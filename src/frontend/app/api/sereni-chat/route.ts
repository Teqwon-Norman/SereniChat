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

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: system
                },
                {
                    role: 'user',
                    content: user
                },
                {
                    role: 'assistant',
                    content: assistant
                
                }
            ]
        });

        return NextResponse.json(response.choices[0].message.content);

    } catch (error: any) {
        console.log(error, 'ERROR_OPENAI');
        return new NextResponse('Internal Error', { status: 500 });
    }
}