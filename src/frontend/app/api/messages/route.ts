import getCurrentUser from '../../../app/actions/getCurrentUser';
import prisma from '../../../app/modules/prismadb';

import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { message, conversationId, isUser } = body;
        
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (isUser) {
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

            return NextResponse.json(newMessage);

        } else {
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

            return NextResponse.json(newMessage);
        }

    } catch (error: any) {
        console.log(error, 'ERROR_MESSSAGES');
        return new NextResponse('Internal Error', { status: 500 });
    }
}