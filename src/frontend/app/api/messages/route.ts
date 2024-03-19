import getCurrentUser from '../../../app/actions/getCurrentUser';
import prisma from '../../../app/modules/prismadb';

import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        console.log(body, 'BODY');
        const { message, conversationId } = body;
        
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true
            }
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: { }
            }
        });


        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
        return NextResponse.json(newMessage);

    } catch (error: any) {
        console.log(error, 'ERROR_MESSSAGES');
        return new NextResponse('Internal Error', { status: 500 });
    }
}