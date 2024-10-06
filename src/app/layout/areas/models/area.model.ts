import { IPos } from "../../pos-vente/models/pos.model";


export interface IArea {
    ID: number;
    id: number;
    name: string;
    commune: string;
    province_id: number;
    sup_id: number; 
    pos: IPos[];
    signature: string; 
    CreatedAt: Date;
    UpdatedAt: Date; 

    province: string;
    sup: string;
}

export interface IAreaDropdown {
    id: number;
    name: string; 
    province_id: number;
    commune: string[];
}  
 