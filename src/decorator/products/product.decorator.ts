import {usedEnum} from "../../constant/products/product.constant";
import {SetMetadata} from "@nestjs/common";


// decorator của state_used
export const ProductDecorator = 'state_used';
export const State_used =(...state_used : usedEnum[]) => SetMetadata(ProductDecorator, state_used);

// decorator của quantity
// export const ProductQuantity = 'quantity';
// export const Quantity =(...quantity : quantityEnum[]) => SetMetadata(ProductQuantity, quantity);

