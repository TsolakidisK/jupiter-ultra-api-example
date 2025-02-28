import { OrderParams, OrderResponse, ExecuteResponse } from '../types/ultraTypes'

export class UltraApiClient {
    private readonly baseUrl: string = 'https://api.jup.ag/ultra/v1';

    async getOrder(params: OrderParams): Promise<OrderResponse> {
        try {
            const url = new URL(`${this.baseUrl}/order`);
            url.searchParams.append('inputMint', params.inputMint);
            url.searchParams.append('outputMint', params.outputMint);
            url.searchParams.append('amount', params.amount.toString());
            if (params.taker) {
                url.searchParams.append('taker', params.taker);
            }

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: OrderResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }

    async executeOrder(signedTransaction: string, requestId: string): Promise<ExecuteResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/execute`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    signedTransaction,
                    requestId,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ExecuteResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error executing order:', error);
            throw error;
        }
    }
}