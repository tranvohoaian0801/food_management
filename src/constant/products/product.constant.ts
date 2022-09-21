export enum usedEnum{
    new_product = 1,
    in_use = 2,
    used_up = 3,
}

export const usedUpAsObject = Object.fromEntries(Object.entries(usedEnum).filter((e)=> isNaN(Number(e[0]))));
export const usedUpIds : number[] = Object.values(usedUpAsObject).map((e: any)=> parseInt(e));
export const useUpNames : string[] = Object.keys(usedUpAsObject);

// export enum quantityEnum{
//     real_quantity = 1,
//     fake_quantity = 2,
// }
//
// export const quantityAsObject = Object.fromEntries(Object.entries(quantityEnum).filter((e)=> isNaN(Number(e[0]))));
// export const quantityIds : number[] = Object.values(quantityAsObject).map((e : any)=> parseInt(e));
// export const quantityNames : string[] = Object.keys(usedUpAsObject);