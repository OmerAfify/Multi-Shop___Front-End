import { ICartItem } from "../Interfaces/ICartItem";

export class ShoppingCart {
    
    id = (Math.random() + 1).toString(36).substring(7);
    items: ICartItem[] = [];
    
}