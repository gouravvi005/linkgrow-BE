export declare const profileData: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    img: string;
    location: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    dialCode: string;
    birthday: string;
    phoneNumber: string;
};
export declare const notificationSettingsData: {
    desktop: boolean;
    unreadMessageBadge: boolean;
    email: string[];
    notifymeAbout: string;
};
export declare const billingSettingsData: {
    currentPlan: {
        plan: string;
        status: string;
        billingCycle: string;
        nextPaymentDate: number;
        amount: number;
    };
    paymentMethods: {
        cardId: string;
        cardHolderName: string;
        cardType: string;
        expMonth: string;
        expYear: string;
        last4Number: string;
        primary: boolean;
    }[];
    transactionHistory: {
        id: string;
        item: string;
        status: string;
        amount: number;
        date: number;
    }[];
};
export declare const intergrationSettingData: {
    id: string;
    name: string;
    desc: string;
    img: string;
    type: string;
    active: boolean;
}[];
export declare const roleGroupsData: {
    id: string;
    name: string;
    description: string;
    users: never[];
    accessRight: {
        users: string[];
        products: string[];
        configurations: string[];
        files: string[];
        reports: string[];
    };
}[];
export declare const pricingPlansData: {
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
