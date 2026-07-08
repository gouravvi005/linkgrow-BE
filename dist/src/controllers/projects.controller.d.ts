export declare class ProjectsController {
    getProjects(): {
        id: string;
        name: string;
        category: string;
        desc: string;
        attachmentCount: number;
        totalTask: number;
        completedTask: number;
        progression: number;
        dayleft: number;
        favourite: boolean;
        member: {
            name: string;
            img: string;
        }[];
    }[];
    getScrumBoard(): {
        'To Do': ({
            id: string;
            name: string;
            description: string;
            cover: string;
            members: {
                id: string;
                name: string;
                email: string;
                img: string;
            }[];
            labels: string[];
            attachments: {
                id: string;
                name: string;
                src: string;
                size: string;
            }[];
            comments: {
                id: string;
                name: string;
                src: string;
                message: string;
                date: Date;
            }[];
            dueDate: Date;
            checked: boolean;
        } | {
            id: string;
            name: string;
            description: string;
            cover: string;
            members: {
                id: string;
                name: string;
                email: string;
                img: string;
            }[];
            labels: string[];
            attachments: never[];
            comments: {
                id: string;
                name: string;
                src: string;
                message: string;
                date: Date;
            }[];
            dueDate: Date;
            checked?: undefined;
        })[];
        'In Progress': ({
            id: string;
            name: string;
            description: string;
            cover: string;
            members: {
                id: string;
                name: string;
                email: string;
                img: string;
            }[];
            labels: string[];
            attachments: never[];
            comments: {
                id: string;
                name: string;
                src: string;
                message: string;
                date: Date;
            }[];
            dueDate: Date;
            checked: boolean;
        } | {
            id: string;
            name: string;
            description: string;
            cover: string;
            members: {
                id: string;
                name: string;
                email: string;
                img: string;
            }[];
            labels: string[];
            attachments: {
                id: string;
                name: string;
                src: string;
                size: string;
            }[];
            comments: {
                id: string;
                name: string;
                src: string;
                message: string;
                date: Date;
            }[];
            dueDate: null;
            checked: boolean;
        })[];
        'To Review': {
            id: string;
            name: string;
            description: string;
            cover: string;
            members: {
                id: string;
                name: string;
                email: string;
                img: string;
            }[];
            labels: string[];
            attachments: {
                id: string;
                name: string;
                src: string;
                size: string;
            }[];
            comments: {
                id: string;
                name: string;
                src: string;
                message: string;
                date: Date;
            }[];
            dueDate: null;
            checked: boolean;
        }[];
        Completed: {
            id: string;
            name: string;
            description: string;
            cover: string;
            members: {
                id: string;
                name: string;
                email: string;
                img: string;
            }[];
            labels: string[];
            attachments: never[];
            comments: {
                id: string;
                name: string;
                src: string;
                message: string;
                date: Date;
            }[];
            dueDate: Date;
            checked: boolean;
        }[];
    };
    getScrumBoardMembers(): {
        participantMembers: {
            id: string;
            name: string;
            email: string;
            img: string;
        }[];
        allMembers: {
            id: string;
            name: string;
            email: string;
            img: string;
        }[];
    };
    getTasks(): {
        'Bug fix': {
            id: string;
            name: string;
            dueDate: string;
            checked: boolean;
            progress: string;
            priority: string;
            assignee: {
                name: string;
                img: string;
            };
        }[];
        Development: {
            id: string;
            name: string;
            dueDate: string;
            checked: boolean;
            progress: string;
            priority: string;
            assignee: {
                name: string;
                img: string;
            };
        }[];
        'UI/UX': {
            id: string;
            name: string;
            dueDate: string;
            checked: boolean;
            progress: string;
            priority: string;
            assignee: {
                name: string;
                img: string;
            };
        }[];
        Planing: {
            id: string;
            name: string;
            dueDate: string;
            checked: boolean;
            progress: string;
            priority: string;
            assignee: {
                name: string;
                img: string;
            };
        }[];
    };
    getTask(id: string): {
        ticketId: string;
        title: string;
        createdBy: string;
        underProject: string;
        status: string;
        priority: string;
        description: string;
        dueDate: number;
        assignees: {
            id: string;
            name: string;
            email: string;
            img: string;
        }[];
        labels: {
            id: string;
            title: string;
        }[];
        comments: {
            id: string;
            name: string;
            src: string;
            message: string;
            date: Date;
        }[];
        attachments: {
            id: string;
            name: string;
            src: string;
            size: string;
        }[];
        activity: ({
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
    };
    getProject(id: string): {
        id: string;
        name: string;
        category: string;
        desc: string;
        attachmentCount: number;
        totalTask: number;
        completedTask: number;
        progression: number;
        dayleft: number;
        favourite: boolean;
        member: {
            name: string;
            img: string;
        }[];
        content: string;
        activities: never[];
        members: never[];
        tasks: never[];
        client: {
            clientName: string;
            skateHolder: {
                name: string;
                img: string;
            };
            projectManager: {
                name: string;
                img: string;
            };
        };
        schedule: {
            startDate: number;
            dueDate: number;
            status: string;
            completion: number;
        };
    };
}
