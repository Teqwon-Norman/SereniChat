import getCurrentUser from '../../../../app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '../../../../app/modules/prismadb';


export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { conversationId } = body;
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                user: true
            }
        });

        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userId: {
                    equals: currentUser.id
                }
            }
        });

        return NextResponse.json(deletedConversation, { status: 200 });

    } catch (error: any) {
        console.log(error, 'ERROR_CONVERSATION_DELETE');
        return new NextResponse('Internal Error', { status: 500 });
    }
}