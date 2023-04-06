import { ICartItem } from "./ICartItem";

export interface IShoppingCart{
    id:string;
    items: ICartItem[];
    DeliveryMethodId?:number;
    clientSecret? : string;
    paymentIntentId? :  string;
    shippingPrice:number

    }