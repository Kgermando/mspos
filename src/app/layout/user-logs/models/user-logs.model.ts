export interface UserLogsModel {
    name: string;
    user_id: number;
    action: string;
    description: string;
    signature: string;
    created_at: Date;
    fullname: string;
    title: string; 
}

export interface UserLogsSubmit {
    name: string;
    user_id: number;
    action: string;
    description: string;
    signature: string;
}