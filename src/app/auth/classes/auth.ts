import { EventEmitter } from "@angular/core";    
import { UserModel } from "../models/user.model";

export class Auth {
    static userEmitter = new EventEmitter<UserModel>();
}