export declare const eCommerceData: {
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
        paymentMehod: string;
        paymentIdendifier: string;
        totalAmount: number;
    }[];
    topProduct: {
        id: string;
        name: string;
        productCode: string;
        img: string;
        sales: number;
        growShrink: number;
    }[];
    customerDemographic: {
        id: string;
        name: string;
        value: number;
        coordinates: number[];
    }[];
    revenueByChannel: {
        thisWeek: {
            value: number;
            growShrink: number;
            percentage: {
                onlineStore: number;
                physicalStore: number;
                socialMedia: number;
            };
        };
        thisMonth: {
            value: number;
            growShrink: number;
            percentage: {
                onlineStore: number;
                physicalStore: number;
                socialMedia: number;
            };
        };
        thisYear: {
            value: number;
            growShrink: number;
            percentage: {
                onlineStore: number;
                physicalStore: number;
                socialMedia: number;
            };
        };
    };
};
export declare const projectData: {
    projectOverview: {
        ongoingProject: number;
        projectCompleted: number;
        upcomingProject: number;
    };
    taskOverview: {
        weekly: {
            onGoing: number;
            finished: number;
            total: number;
            series: {
                name: string;
                data: number[];
            }[];
            range: string[];
        };
        daily: {
            onGoing: number;
            finished: number;
            total: number;
            series: {
                name: string;
                data: number[];
            }[];
            range: string[];
        };
    };
    currentTasks: {
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
    schedule: ({
        start: Date;
        end: Date;
        name: string;
        id: string;
        progress: number;
        type: string;
        hideChildren: boolean;
        displayOrder: number;
        barVariant: string;
        project?: undefined;
        dependencies?: undefined;
    } | {
        start: Date;
        end: Date;
        name: string;
        id: string;
        progress: number;
        type: string;
        project: string;
        displayOrder: number;
        barVariant: string;
        hideChildren?: undefined;
        dependencies?: undefined;
    } | {
        start: Date;
        end: Date;
        name: string;
        id: string;
        progress: number;
        dependencies: string[];
        type: string;
        project: string;
        displayOrder: number;
        barVariant: string;
        hideChildren?: undefined;
    })[];
    recentActivity: ({
        type: string;
        dateTime: string;
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
        dateTime: string;
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
        dateTime: string;
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
        dateTime: string;
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
        dateTime: string;
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
export declare const analyticsData: {
    thisMonth: {
        metrics: {
            visitors: {
                value: number;
                growShrink: number;
            };
            conversionRate: {
                value: number;
                growShrink: number;
            };
            adCampaignClicks: {
                value: number;
                growShrink: number;
            };
        };
        webAnalytic: {
            pageView: {
                value: number;
                growShrink: number;
            };
            avgTimeOnPage: {
                value: string;
                growShrink: number;
            };
            series: {
                name: string;
                data: number[];
            }[];
            date: string[];
        };
        traffic: {
            source: string;
            visits: number;
            uniqueVisitors: number;
            bounceRate: string;
            avgSessionDuration: string;
            progress: number;
        }[];
        topChannel: {
            visitors: number;
            channels: {
                id: string;
                name: string;
                img: string;
                total: number;
                percentage: number;
            }[];
        };
        deviceSession: {
            labels: string[];
            series: number[];
            percentage: number[];
        };
        topPages: {
            pageUrl: string;
            views: {
                amount: number;
                growth: number;
            };
            uniqueVisitor: {
                amount: number;
                growth: number;
            };
        }[];
    };
    thisYear: {
        metrics: {
            visitors: {
                value: number;
                growShrink: number;
            };
            conversionRate: {
                value: number;
                growShrink: number;
            };
            adCampaignClicks: {
                value: number;
                growShrink: number;
            };
        };
        webAnalytic: {
            pageView: {
                value: number;
                growShrink: number;
            };
            avgTimeOnPage: {
                value: string;
                growShrink: number;
            };
            series: {
                name: string;
                data: number[];
            }[];
            date: string[];
        };
        traffic: {
            source: string;
            visits: number;
            uniqueVisitors: number;
            bounceRate: string;
            avgSessionDuration: string;
            progress: number;
        }[];
        topChannel: {
            visitors: number;
            channels: {
                id: string;
                name: string;
                img: string;
                total: number;
                percentage: number;
            }[];
        };
        deviceSession: {
            labels: string[];
            series: number[];
            percentage: number[];
        };
        topPages: {
            pageUrl: string;
            views: {
                amount: number;
                growth: number;
            };
            uniqueVisitor: {
                amount: number;
                growth: number;
            };
        }[];
    };
    thisWeek: {
        metrics: {
            visitors: {
                value: number;
                growShrink: number;
            };
            conversionRate: {
                value: number;
                growShrink: number;
            };
            adCampaignClicks: {
                value: number;
                growShrink: number;
            };
        };
        webAnalytic: {
            pageView: {
                value: number;
                growShrink: number;
            };
            avgTimeOnPage: {
                value: string;
                growShrink: number;
            };
            series: {
                name: string;
                data: number[];
            }[];
            date: string[];
        };
        traffic: {
            source: string;
            visits: number;
            uniqueVisitors: number;
            bounceRate: string;
            avgSessionDuration: string;
            progress: number;
        }[];
        topChannel: {
            visitors: number;
            channels: {
                id: string;
                name: string;
                img: string;
                total: number;
                percentage: number;
            }[];
        };
        deviceSession: {
            labels: string[];
            series: number[];
            percentage: number[];
        };
        topPages: {
            pageUrl: string;
            views: {
                amount: number;
                growth: number;
            };
            uniqueVisitor: {
                amount: number;
                growth: number;
            };
        }[];
    };
};
export declare const marketingData: {
    kpiSummary: {
        totalMarketingSpend: {
            value: number;
            growShrink: number;
        };
        roi: {
            value: number;
            growShrink: number;
        };
        conversionRates: {
            value: number;
            growShrink: number;
        };
        totalLeads: {
            value: number;
            growShrink: number;
        };
    };
    adsPerformance: {
        campagin: number[];
        email: number[];
        label: string[];
    };
    leadPerformance: {
        categories: string[];
        series: number[];
    };
    recentCampaign: {
        id: string;
        name: string;
        startDate: number;
        endDate: number;
        budget: number;
        leadsGenerated: number;
        conversions: number;
        conversionRate: number;
        status: string;
        type: string;
        audienceGroup: string[];
    }[];
};
