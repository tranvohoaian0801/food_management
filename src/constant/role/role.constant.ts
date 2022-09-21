
export enum EnumRole {
    admin = 1 ,
    support = 2,
}

export const RoleAsObject =Object.fromEntries(Object.entries(EnumRole).filter((e)=> isNaN(Number(e[0]))));

export const RoleIds : number[] = Object.values(RoleAsObject).map((e : any) => parseInt(e));
export const RoleNames : string[] =Object.keys(RoleAsObject);