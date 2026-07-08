export declare class AiController {
    chat(body: any): Promise<{
        id: string;
        choices: {
            finish_reason: string;
            index: number;
            message: {
                content: string;
                role: string;
            };
        }[];
        created: number;
        model: string;
    }>;
    getChatHistory(): {
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
    getImages(index?: string, itemCount?: string): {
        data: {
            id: string;
            prompt: string;
            image: string;
            ratio: string;
            size: string;
            like: number;
        }[];
        loadable: boolean;
    };
    postImages(body: any): Promise<{
        id: string;
        prompt: string;
        image: string;
        ratio: string;
        size: string;
        like: number;
    }[]>;
}
