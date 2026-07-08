export declare class LogController {
    getLogs(activityIndex?: string, filter?: string | string[]): {
        data: ({
            id: string;
            date: number;
            events: ({
                type: string;
                dateTime: number;
                ticket: string;
                status: number;
                userName: string;
                userImg: string;
                comment?: undefined;
                tags?: undefined;
                files?: undefined;
                assignee?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                userImg: string;
                comment: string;
                ticket?: undefined;
                status?: undefined;
                tags?: undefined;
                files?: undefined;
                assignee?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                tags: string[];
                ticket?: undefined;
                status?: undefined;
                userImg?: undefined;
                comment?: undefined;
                files?: undefined;
                assignee?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                files: string[];
                ticket: string;
                status?: undefined;
                userImg?: undefined;
                comment?: undefined;
                tags?: undefined;
                assignee?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                assignee: string;
                ticket: string;
                status?: undefined;
                userImg?: undefined;
                comment?: undefined;
                tags?: undefined;
                files?: undefined;
            })[];
        } | {
            id: string;
            date: number;
            events: ({
                type: string;
                dateTime: number;
                userName: string;
                userImg: string;
                comment: string;
                ticket?: undefined;
                status?: undefined;
                tags?: undefined;
            } | {
                type: string;
                dateTime: number;
                ticket: string;
                status: number;
                userName: string;
                userImg: string;
                comment?: undefined;
                tags?: undefined;
            } | {
                type: string;
                dateTime: number;
                ticket: string;
                userName: string;
                userImg?: undefined;
                comment?: undefined;
                status?: undefined;
                tags?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                tags: string[];
                userImg?: undefined;
                comment?: undefined;
                ticket?: undefined;
                status?: undefined;
            } | {
                type: string;
                dateTime: number;
                ticket: string;
                status: number;
                userName: string;
                userImg?: undefined;
                comment?: undefined;
                tags?: undefined;
            })[];
        } | {
            id: string;
            date: number;
            events: ({
                type: string;
                dateTime: number;
                ticket: string;
                status: number;
                userName: string;
                userImg: string;
                comment?: undefined;
                files?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                userImg: string;
                comment: string;
                ticket?: undefined;
                status?: undefined;
                files?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                files: string[];
                ticket: string;
                status?: undefined;
                userImg?: undefined;
                comment?: undefined;
            } | {
                type: string;
                dateTime: number;
                ticket: string;
                userName: string;
                status?: undefined;
                userImg?: undefined;
                comment?: undefined;
                files?: undefined;
            })[];
        } | {
            id: string;
            date: number;
            events: ({
                type: string;
                dateTime: number;
                ticket: string;
                userName: string;
                tags?: undefined;
                userImg?: undefined;
                comment?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                tags: string[];
                ticket: string;
                userImg?: undefined;
                comment?: undefined;
            } | {
                type: string;
                dateTime: number;
                userName: string;
                userImg: string;
                comment: string;
                ticket?: undefined;
                tags?: undefined;
            })[];
        } | {
            id: string;
            date: number;
            events: ({
                type: string;
                dateTime: number;
                userName: string;
                userImg: string;
                comment: string;
                username?: undefined;
                files?: undefined;
                ticket?: undefined;
            } | {
                type: string;
                dateTime: number;
                username: string;
                files: string[];
                ticket: string;
                userName?: undefined;
                userImg?: undefined;
                comment?: undefined;
            } | {
                type: string;
                dateTime: number;
                username: string;
                userImg: string;
                comment: string;
                userName?: undefined;
                files?: undefined;
                ticket?: undefined;
            })[];
        })[];
        loadable: boolean;
    };
}
