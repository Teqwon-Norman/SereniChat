import { Conversation, Message, User } from '@prisma/client';

export type FullMessageType = Message & {
    sender: User | null;
};

export type FullConversationType = Conversation & {
    user: User,
    messages: FullMessageType[],
};