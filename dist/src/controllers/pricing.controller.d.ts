export declare class PricingController {
    getPlans(): {
        featuresModel: {
            id: string;
            description: string;
        }[];
        plans: {
            id: string;
            name: string;
            description: string;
            price: {
                monthly: number;
                annually: number;
            };
            features: string[];
            recommended: boolean;
        }[];
    };
}
