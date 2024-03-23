import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { inputs } = body;
        const response = await axios.post('https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions', {
            inputs,
            
            headers : {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
            }
        });

        return NextResponse.json(response.data[0][0]['label']);

    } catch (error: any) {
        console.log(error, 'ERROR_SENTIMENT_ANALYSIS');
        return new NextResponse('Internal Error', { status: 500 });
    }
}