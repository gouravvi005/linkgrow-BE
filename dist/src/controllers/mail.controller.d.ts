export declare class MailController {
    getMailList(category?: string, label?: string): {
        id: string;
        name: string;
        label: string;
        group: string;
        flagged: boolean;
        starred: boolean;
        from: string;
        avatar: string;
        title: string;
        mail: string[];
        message: {
            id: string;
            name: string;
            mail: string[];
            from: string;
            avatar: string;
            date: string;
            content: string;
            attachment: {
                file: string;
                size: string;
                type: string;
            }[];
        }[];
    }[];
    getMailById(id: string): {};
    getMailQuery(mailId?: string): {};
}
