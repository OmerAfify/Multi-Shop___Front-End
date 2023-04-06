import { IProduct } from "./IProduct";

export interface IPagination{
    count: number,
    pageSize: number,
    pageNumber: number,
    data:IProduct[]

}