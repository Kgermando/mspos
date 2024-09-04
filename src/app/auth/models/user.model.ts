export interface UserModel {
    id: number;
    fullname: string;
    email: string;
    title: string;
    phone: string;
    password: string;
    password_confirm: string;
    area_id: number;
    province_id: number;
    sup_id: number;
    pos_id: number;
    role: string;
    permission: string;
    image: string;
    status: boolean;
    signature: string; 
    
    created_at: Date;
    updated_at: Date;
}