export declare const categoriesData: {
    name: string;
    topics: {
        id: string;
        name: string;
        description: string;
        articleCounts: number;
    }[];
}[];
export declare const articleListData: {
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
export declare const articleDetailData: {
    content: string;
    tableOfContent: {
        id: string;
        label: string;
    }[];
};
export declare const articleTagsData: {
    tags: {
        id: number;
        label: string;
    }[];
};
declare class ArticleList {
    list: {
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
    getList(): {
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
    setList(list: any): void;
}
export declare const articleList: ArticleList;
export {};
