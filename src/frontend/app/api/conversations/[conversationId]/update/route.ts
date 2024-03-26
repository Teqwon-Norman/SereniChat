import { NextResponse } from 'next/server';

import getCurrentUser from '../../../../../app/actions/getCurrentUser';
import { pusherServer } from '../../../../../app/modules/pusher';
import prisma from '../../../../../app/modules/prismadb';

interface IParams {
    conversationId?: string;
};

export async function POST(request: Request, { params }: { params: IParams}) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Find the existing conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    
                },
                user: true,
            }
        });

        if (!conversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        // Find the last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (!lastMessage) {
            return NextResponse.json(conversation);
        }

        return NextResponse.json(lastMessage);

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SEEN');
        return new NextResponse('Internal Error', { status: 500 });
    }
}