
export interface IUser {
    ID: number;
    fullname: string;
    email: string;
    title: string;
    phone: string;
    password: string;
    password_confirm: string;
    province_id: number;
    area_id: number; 
    sup_id: number;
    pos_id: number;
    role: string; // Idem with title
    permission: string;
    image: string;
    status: boolean;
    is_manager: boolean;
    signature: string; 
    CreatedAt: Date;
    UpdatedAt: Date;
}
