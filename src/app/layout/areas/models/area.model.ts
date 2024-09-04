import { IPos } from "../../pos-vente/models/pos.model";


export interface IArea {
    ID: number;
    name: string;
    province_id: number;
    sup_id: number;
    pos: IPos[];
    signature: string; 
    CreatedAt: Date;
    UpdatedAt: Date;
}