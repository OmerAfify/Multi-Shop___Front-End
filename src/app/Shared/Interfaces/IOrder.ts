import { ShoppingCart } from "../Models/ShoppingCart"
import { IAddress } from "./IAddress"

export interface IOrderToCreate{
 shoppingCart: ShoppingCart | null,
 deliveryMethodId:number,
 shippingAddress:IAddress
      }

export interface IOrder{
    orderId: number,
    email: string,
    orderDate: string,
    shippingAddress:IAddress,
    subTotal: number,
    total:number,
    orderedItems: IOrderItem[],
    status: string,
    deliveryMethod: string,
    deliveryPrice: number
      }

export interface IOrderItem{
        productId: number,
        productName: string,
        pictureUrl: string,
        productSalesPrice: number,
        quantity: number,
        totalPrice: number
          }


