import getCurrentUser from '../../../app/actions/getCurrentUser';
import prisma from '../../../app/modules/prismadb';

import { pusherServer } from '../../../app/modules/pusher';

import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { message, conversationId, isUser, sentiment } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (isUser) {
            const newMessage = await prisma.message.create({
                data: {
                    body: message,
                    sentimentAnalysis: sentiment,
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
                    user: true,
                    messages: {
                        
                    }
                }
            });

            await pusherServer.trigger(conversationId, 'messages:new', newMessage);

            const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

            if (updatedConversation.user.email) {
                pusherServer.trigger(updatedConversation.user.email!, 'conversation:update', {
                    id: conversationId,
                    messages: [lastMessage]
                })
        }

            return NextResponse.json(newMessage);
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                }
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
                messages: { }
            }
        });

        await pusherServer.trigger(conversationId, 'messages:new', newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

        if (updatedConversation.id) {
            pusherServer.trigger(updatedConversation.id, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage]
            })
        }

        return NextResponse.json(newMessage);

    } catch (error: any) {
        console.log(error, 'ERROR_MESSSAGES');
        return new NextResponse('Internal Error', { status: 500 });
    }
}