import getCurrentUser from "../../../app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../../app/modules/prismadb';

export async function POST() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversations = await prisma.conversation.findMany({
            where: { userId: { equals: currentUser.id } }
        });

        const singleConversation = existingConversations[0];
        
        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                user: {
                    connect: { id: currentUser.id }
                }
            },
            include: { user: true }
        });

        return NextResponse.json(newConversation);

    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}