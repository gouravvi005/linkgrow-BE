export declare const chatList: ({
    id: string;
    name: string;
    userId: string;
    avatar: string;
    unread: number;
    time: number;
    lastConversation: string;
    chatType: string;
    groupId?: undefined;
} | {
    id: string;
    name: string;
    groupId: string;
    avatar: string;
    unread: number;
    time: number;
    lastConversation: string;
    chatType: string;
    userId?: undefined;
})[];
export declare const conversationList: {
    id: string;
    conversation: {
        id: string;
        sender: {
            id: string;
            name: string;
            avatarImageUrl: string;
        };
        content: string;
        timestamp: number;
        type: string;
        isMyMessage: boolean;
    }[];
}[];
export declare const mediaData: {
    images: {
        id: string;
        name: string;
        url: string;
    }[];
    files: {
        id: string;
        name: string;
        fileType: string;
        size: number;
        srcUrl: string;
    }[];
    links: {
        id: string;
        favicon: string;
        title: string;
        description: string;
        url: string;
    }[];
};
export declare const groupsData: {
    id: string;
    name: string;
    img: string;
    members: {
        id: string;
        name: string;
        img: string;
        email: string;
    }[];
}[];
