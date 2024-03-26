import getCurrentUser from "../../../app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../../app/modules/prismadb';
import { pusherServer } from '../../../app/modules/pusher';

export async function POST() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newConversation = await prisma.conversation.create({
            data: {
                user: {
                    connect: { id: currentUser.id }
                }
            },
            include: { user: true }
        });

        if (newConversation.user.email) {
            pusherServer.trigger(newConversation.user.email, 'conversation:new', newConversation);
        }

        return NextResponse.json(newConversation);

    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}