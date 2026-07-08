import { DatabaseService } from "../database/database.service";
export declare class DashboardController {
    private readonly db;
    constructor(db: DatabaseService);
    getAnalyticDashboard(): Promise<{
        clicks: number;
        uniqueVisitors: number;
        bounceRate: number;
        avgSessionDuration: number;
    }>;
    getEcommerceDashboard(): Promise<{
        statisticData: {
            totalProfit: {
                thisWeek: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
                thisMonth: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
                thisYear: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
            };
            totalOrder: {
                thisWeek: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
                thisMonth: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
                thisYear: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
            };
            totalImpression: {
                thisWeek: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
                thisMonth: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
                thisYear: {
                    value: number;
                    growShrink: number;
                    comparePeriod: string;
                    chartData: {
                        series: {
                            name: string;
                            data: number[];
                        }[];
                        date: string[];
                    };
                };
            };
        };
        salesTarget: {
            thisWeek: {
                target: number;
                achieved: number;
                percentage: number;
            };
            thisMonth: {
                target: number;
                achieved: number;
                percentage: number;
            };
            thisYear: {
                target: number;
                achieved: number;
                percentage: number;
            };
        };
        recentOrders: {
            id: string;
            date: string;
            customer: string;
            status: number;
            paymentMethod: string;
            paymentIdentifier: string;
            totalAmount: number;
        }[];
        customerDemographic: {
            series: number[];
            categories: string[];
        };
        revenueByChannel: {
            name: string;
            value: number;
            percentage: number;
        }[];
        topProduct: {
            id: string;
            name: string;
            sales: number;
            amount: number;
            image: string;
        }[];
    }>;
    getMarketingDashboard(): {
        campaignsActive: number;
        leadsGenerated: number;
        conversionRate: number;
    };
    getProjectDashboard(): {
        tasksCompleted: number;
        tasksPending: number;
        teamMembers: number;
    };
}
