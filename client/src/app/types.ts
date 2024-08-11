export interface User {
    email:string;
    token:string;
    username:string;
    bio:string | null;
    image:string | null;
}

export interface Author {
    username:string;
    bio:string | null;
    image:string | null;
    followers: string[] | null;
    _id: string;
}

export interface Article {
    slug:string;
    title:string;
    description:string;
    body:string;
    tagList:string[];
    createdAt:string;
    updatedAt:string;
    favourites:string[];
    author:Author;
}

export interface Comment {
    id:number;
    createdAt:string;
    updatedAt:string;
    body:string;
    author:Author;
}
