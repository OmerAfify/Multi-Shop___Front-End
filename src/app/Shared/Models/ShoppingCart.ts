import { ICartItem } from "../Interfaces/ICartItem";
import { IShoppingCart } from "../Interfaces/IShoppingCart";

export class ShoppingCart implements IShoppingCart {

    id = (Math.random() + 1).toString(36).substring(7);
    items: ICartItem[] = [];
    DeliveryMethodId?:number;
    clientSecret? : string;
    paymentIntentId? : string;
    shippingPrice: number = 0

}
