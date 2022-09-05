import { ValidatorFn } from "./models/ValidatorFn";
import { LengthOption } from './models/options/lengthOption';

const _validateLength : ValidatorFn = (text:string , options?: LengthOption) : boolean => {

    const textLength = text.trim().length;

    if(options?.min && textLength < options.min) return false
    if(options?.max && textLength > options.max) return false

    return true
}

export const  validatePasswordLenght : ValidatorFn = (text : string ) : boolean => {
    return _validateLength(text , {min : 6 , max : 20})
}

export const  validateNameLenght : ValidatorFn = (text : string ) : boolean => {
    return _validateLength(text , {min : 2})
}