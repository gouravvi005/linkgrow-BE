export declare class CommonController {
    getNotificationsCount(): {
        count: number;
    };
    getNotifications(): {
        id: string;
        target: string;
        description: string;
        date: string;
        image: string;
        type: number;
        location: string;
        locationLabel: string;
        status: string;
        readed: boolean;
    }[];
    search(query?: string): {
        title: string;
        data: Record<string, any>[];
    }[];
}
