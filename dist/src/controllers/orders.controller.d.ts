export declare class OrdersController {
    getOrders(pageIndex?: string, pageSize?: string, sortKey?: string, order?: string, query?: string): {
        list: any[];
        total: number;
    };
    getOrder(id: string): {
        id: string;
        progressStatus: number;
        paymentStatus: number;
        dateTime: number;
        paymentSummary: {
            subTotal: number;
            tax: number;
            deliveryFees: number;
            total: number;
            customerPayment: number;
        };
        shipping: {
            deliveryFees: number;
            estimatedMin: number;
            estimatedMax: number;
            shippingLogo: string;
            shippingVendor: string;
        };
        note: string;
        activity: {
            date: number;
            events: ({
                time: number;
                action: string;
                recipient: string;
            } | {
                time: number;
                action: string;
                recipient?: undefined;
            })[];
        }[];
        product: {
            id: string;
            name: string;
            productCode: string;
            img: string;
            price: number;
            quantity: number;
            total: number;
        }[];
        customer: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            dialCode: string;
            phoneNumber: string;
            img: string;
            previousOrder: number;
            address: string;
            postcode: string;
            city: string;
            country: string;
            shippingAddress: {
                line1: string;
                line2: string;
                line3: string;
                line4: string;
            };
            billingAddress: {
                line1: string;
                line2: string;
                line3: string;
                line4: string;
            };
        };
    };
}
