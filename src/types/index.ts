export interface Guitar {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export interface Cartitem extends Guitar{
    quantity: number;
}