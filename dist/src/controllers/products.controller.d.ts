export declare class ProductsController {
    getProducts(pageIndex?: string, pageSize?: string, sortKey?: string, order?: string, query?: string): {
        list: any[];
        total: number;
    };
    getProduct(id: string): {
        id: string;
        name: string;
        productCode: string;
        img: string;
        imgList: {
            id: string;
            name: string;
            img: string;
        }[];
        category: string;
        price: number;
        stock: number;
        status: number;
        costPerItem: number;
        bulkDiscountPrice: number;
        taxRate: number;
        tags: string[];
        brand: string;
        vendor: string;
        active: boolean;
        sales: number;
        salesPercentage: number;
        description: string;
    };
}
