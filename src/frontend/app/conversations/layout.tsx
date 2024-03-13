import React, { ReactNode } from 'react';

import Sidebar from '../components/Sidebar';
import ConversationList from './components/ConversationList';
import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';

export default async function ConversationsLayout({ children }: { children: ReactNode }) {

    const conversations = await getConversations();
    const users = await getUsers();


    return (
        <div className="h-full">
            <ConversationList
                users={users}
                initialItems={conversations}
            />
            { children }
        </div>
    )
};