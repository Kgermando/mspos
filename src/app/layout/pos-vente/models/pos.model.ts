export interface IPos {
    ID: number;
    id: number;

    name: string;
    shop: string;
    manager: string;
    commune: string;
    avenue: string;
    quartier: string;
    reference: string;
    telephone: string;
    eparasol: string;
    etable: string;
    ekiosk: boolean;
    inputgroupselector: string;
    cparasol: string;
    ctable: string;
    ckiosk: boolean;
    province_id:  number;
    area_id:  number;
    user_id: number;
    status: boolean;
    signature: string;
    CreatedAt: Date;
    UpdatedAt: Date;

    province:  string;
    area:  string;
    dr: string; 
}
