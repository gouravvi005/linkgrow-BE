export declare const usersData: {
    id: string;
    name: string;
    email: string;
    img: string;
}[];
export declare const userDetailData: ({
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    img: string;
    role: string;
    lastOnline: number;
    status: string;
    title: string;
    personalInfo: {
        location: string;
        address: string;
        postcode: string;
        city: string;
        country: string;
        dialCode: string;
        birthday: string;
        phoneNumber: string;
        facebook: string;
        twitter: string;
        pinterest: string;
        linkedIn: string;
        ddress?: undefined;
    };
    orderHistory: {
        id: string;
        item: string;
        status: string;
        amount: number;
        date: number;
    }[];
    paymentMethod: {
        cardHolderName: string;
        cardType: string;
        expMonth: string;
        expYear: string;
        last4Number: string;
        primary: boolean;
    }[];
    subscription: {
        plan: string;
        status: string;
        billing: string;
        nextPaymentdate: number;
        amount: number;
    }[];
    totalSpending: number;
} | {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    img: string;
    role: string;
    lastOnline: number;
    status: string;
    title: string;
    personalInfo: {
        location: string;
        ddress: string;
        postcode: string;
        city: string;
        country: string;
        dialCode: string;
        birthday: string;
        phoneNumber: string;
        facebook: string;
        twitter: string;
        pinterest: string;
        linkedIn: string;
        address?: undefined;
    };
    orderHistory: {
        id: string;
        item: string;
        status: string;
        amount: number;
        date: number;
    }[];
    paymentMethod: {
        cardHolderName: string;
        cardType: string;
        expMonth: string;
        expYear: string;
        last4Number: string;
        primary: boolean;
    }[];
    subscription: {
        plan: string;
        status: string;
        billing: string;
        nextPaymentdate: number;
        amount: number;
    }[];
    totalSpending: number;
})[];
