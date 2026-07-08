export declare class FileController {
    getFiles(id: string): {
        list: {
            id: string;
            name: string;
            fileType: string;
            srcUrl: string;
            size: number;
            author: {
                name: string;
                email: string;
                img: string;
            };
            activities: {
                userName: string;
                userImg: string;
                actionType: string;
                timestamp: number;
            }[];
            permissions: {
                userName: string;
                userImg: string;
                role: string;
            }[];
            uploadDate: number;
            recent: boolean;
        }[];
        directory: {
            id: string;
            label: string;
        }[];
    };
}
