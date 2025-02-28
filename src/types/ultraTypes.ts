export interface OrderParams {
    inputMint: string;
    outputMint: string;
    amount: number;
    taker?: string;
}

export interface OrderResponse {
    id: string;
    inputMint: string;
    outputMint: string;
    amount: string;
    transaction?: string;
    requestId: string;
    [key: string]: any;
}

export interface ExecuteResponse {
    status: 'Success' | 'Failed' | string;
    signature: string;
    [key: string]: any;
}