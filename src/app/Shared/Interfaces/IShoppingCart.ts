import { ICartItem } from "./ICartItem";

export interface IShoppingCart{
    id:string;
    items: ICartItem[];
    DeliveryMethodId?:number;
    ClientSecret? : string;
    PaymentIntentId? : number;
    shippingPrice:number

    }