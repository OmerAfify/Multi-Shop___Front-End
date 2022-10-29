import { EventEmitter, Injectable } from "@angular/core";


@Injectable()
export class AccountService{

    users=[{name:'Omar', id:1},{name:'Zaki', id:2},{name:'Khalid', id:3}]

    activatedEmitter = new EventEmitter<boolean>();
    active:any;

    constructor() {

    }

}