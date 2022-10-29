
interface IProduct{
    productId : number,
    productName : string,
    salesPrice : number,
    categoryId:number,
    categoryName:string,
    description:string,
    productImages?: Array<IProductImage>

}
