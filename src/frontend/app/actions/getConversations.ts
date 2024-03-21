import prisma from '../../app/modules/prismadb';
import getCurrentUser from './getCurrentUser';

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userId: {
                    equals: currentUser.id
                }
            },
            include: {
                user: true,
                messages: {
                    include: {
                        sender: true,
                    }
                }
            }
        });

        return conversations;
    } catch (error: any) {
        return [];
    }
}

export default getConversations;