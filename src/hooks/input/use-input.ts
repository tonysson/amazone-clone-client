import { InputState } from "./models/InputState.interface";
import { Action } from '../../shared/models/action.interface';
import { InputActionType, INPUT_ACTION_BLUR, INPUT_ACTION_CHANGE, INPUT_ACTION_CLEAR } from "./models/InputAction";
import { ChangeEvent, useReducer } from "react";
import { ValidatorFn } from "../../shared/utils/validation/models/ValidatorFn";


const initialInputState : InputState = {
    text : '',
    hasBeenTouched : false,
}

const inputReducer = (state : InputState , action: Action<InputActionType> ) => {

    const {type , value = ''} = action

    switch(type){
        case INPUT_ACTION_CHANGE:
            return {text : value , hasBeenTouched : state.hasBeenTouched}
    
         case INPUT_ACTION_BLUR:
            return {text : state.text , hasBeenTouched : true}
         case INPUT_ACTION_CLEAR:
            return {text : '' , hasBeenTouched : false}

        default:
           return {...state}
    }
}

const useInput = (validatorFn? : ValidatorFn) => {
  const [{text , hasBeenTouched}, dispacth] =  useReducer(inputReducer, initialInputState)

  let shouldDisplayError;

  if(validatorFn){
    const isValid = validatorFn(text)
    shouldDisplayError = !isValid && hasBeenTouched
  }

  const textChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
    dispacth({type : INPUT_ACTION_CHANGE , value : e.target.value})
  }

  const inputBlurHandler = () => {
    dispacth({type : INPUT_ACTION_BLUR })
  }

  const clearHandler = () => {
    dispacth({type : INPUT_ACTION_CLEAR })
  }

  return {
    text , hasBeenTouched,  textChangeHandler , inputBlurHandler , clearHandler, shouldDisplayError
  }
}


export default useInput


