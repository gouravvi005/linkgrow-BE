export declare const chatHistoryData: {
    id: string;
    title: string;
    lastConversation: string;
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
    createdTime: number;
    updatedTime: number;
    enable: boolean;
}[];
export declare const imageData: {
    id: string;
    prompt: string;
    image: string;
    ratio: string;
    size: string;
    like: number;
}[];
export declare const generatedImageData: {
    id: string;
    prompt: string;
    image: string;
    ratio: string;
    size: string;
    like: number;
}[][];
