import { Cart } from "./models/Cart";
import { ProductDocument } from "./models/Products";
import { createAsyncThunk,  PayloadAction,  } from '@reduxjs/toolkit';
import productService from './services/productService';
import { createSlice } from '@reduxjs/toolkit';


interface AsyncState {
    isLoading : boolean
    isSuccess : boolean
    isError : boolean
}


interface ProductState extends AsyncState {

    products : ProductDocument[]
    cart : Cart
}


const initialState : ProductState = {

    products : [],
    cart : [],
    isLoading :false,
    isSuccess : false,
    isError : false
}

export const  getProducts = createAsyncThunk('product', async() => {
    try {
        return await productService.getProducts()
    } catch (error) {
        console.log('Error', error)
    }
})

const modifyQtyByOne = (cart : Cart , selectedProduct : ProductDocument , modificationType : 'INCREMENT' | 'DECREMENT' ) => {

    const previousCart = [...cart]

    // Verify if the product is the cart
    const productInCart = previousCart.find(product => product._id === selectedProduct._id)

    let newCart = []
    // if the product is not in the cart we set it's qty to 1
    if(!productInCart){
        previousCart.push({...selectedProduct, quantity : 1})
        newCart = previousCart
    }else{
         // if the product is  in the cart we increment the qty
         const filteredCart = previousCart.filter(product => product._id !== productInCart._id )

         const modification = modificationType === 'INCREMENT' ? 1 : -1

         productInCart.quantity = productInCart.quantity + modification

         if(productInCart.quantity === 0){
            newCart = [...filteredCart ]
         }else{
            newCart = [...filteredCart , productInCart]
         }
    }

    return newCart

}

export const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers:{

        // INCREMENT PRODUCT
        incrementProduct : (state, action : PayloadAction<ProductDocument>) => {
          const modifiedCart =  modifyQtyByOne(state.cart , action.payload , 'INCREMENT' )
          state.cart = modifiedCart
        },

        //DECREMENT PRODUCT
        decrementProduct : (state, action : PayloadAction<ProductDocument>) => {
          const modifiedCart =  modifyQtyByOne(state.cart , action.payload , 'DECREMENT' )
          state.cart = modifiedCart
        },

        resetCart : (state) => {
            state.cart = []
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getProducts.pending,(state) =>{
            state.isLoading = true
        }).addCase(getProducts.fulfilled, (state , action) => {
            state.isLoading = false 
            state.isSuccess = true
            state.products = action.payload?.data || []
            
        }).addCase(getProducts.rejected, (state) => {
            state.isLoading = false
            state.isError = true
             state.products =  []
            
        })
    }
})

export const {incrementProduct, decrementProduct , resetCart} = productSlice.actions
export default productSlice.reducer





