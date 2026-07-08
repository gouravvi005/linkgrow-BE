export declare class HelpCenterController {
    private articles;
    private managedList;
    getArticles(query?: string, topic?: string): Record<string, any>[] | {
        id: string;
        title: string;
        content: string;
        category: string;
        authors: {
            name: string;
            img: string;
        }[];
        tags: {
            id: number;
            label: string;
        }[];
        starred: boolean;
        published: boolean;
        updateTime: string;
        updateTimeStamp: number;
        createdBy: string;
        timeToRead: number;
        viewCount: number;
        commentCount: number;
    }[];
    getCategories(): {
        categories: {
            name: string;
            topics: {
                id: string;
                name: string;
                description: string;
                articleCounts: number;
            }[];
        }[];
        popularArticles: {
            id: string;
            title: string;
            content: string;
            category: string;
            authors: {
                name: string;
                img: string;
            }[];
            tags: {
                id: number;
                label: string;
            }[];
            starred: boolean;
            published: boolean;
            updateTime: string;
            updateTimeStamp: number;
            createdBy: string;
            timeToRead: number;
            viewCount: number;
            commentCount: number;
        }[];
    };
    getManageArticles(pageIndex?: string, pageSize?: string, sortKey?: string, order?: string, query?: string, category?: string): {
        list: any[];
        total: number;
    };
    getArticle(id: string): {
        content: string;
        tableOfContent: {
            id: string;
            label: string;
        }[];
        id: string;
        title: string;
        category: string;
        authors: {
            name: string;
            img: string;
        }[];
        tags: {
            id: number;
            label: string;
        }[];
        starred: boolean;
        published: boolean;
        updateTime: string;
        updateTimeStamp: number;
        createdBy: string;
        timeToRead: number;
        viewCount: number;
        commentCount: number;
    };
    deleteArticles(body: any): {};
}
