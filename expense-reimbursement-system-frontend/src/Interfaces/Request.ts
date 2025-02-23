import { User } from "./User";

export interface Request {
    reimbId:number,
    description:string,
    amount:number,
    status:string,
    user:User
}