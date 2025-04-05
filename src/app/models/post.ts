export interface Post {
    title:string,
    permalink:string,
    category:{
        categoryId:string,
        category:string
    },
    content:string,
    excerpt:string,
    postImgPath:string
    isFeatured:boolean,
    views:number,
    status:string,
    createdAt:Date

}
