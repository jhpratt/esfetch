export default function esfetch(url: string, opts?: {}): {
    (url_addition: string, opts_addition?: {}): any;
    get(queryParams?: {
        [key: string]: unknown;
    } | [string, unknown][]): Promise<any>;
    post(data?: any): Promise<any>;
    put(data?: any): Promise<any>;
    patch(data?: any): Promise<any>;
    delete(): Promise<any>;
};
