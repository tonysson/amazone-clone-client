import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { DisplayUser } from './models/DisplayUser';
import { Jwt } from "./models/Jwt";
import { NewUser } from "./models/NewUser";
import authService from './services/authService';
import { LoginUser } from './models/LoginUser';

const storedUser: string | null = localStorage  && localStorage.getItem('user');
const user: DisplayUser = !!storedUser ? JSON.parse(storedUser) : null;



const storedJwt: string | null = localStorage  && localStorage.getItem('jwt');
const jwt: Jwt = !!storedJwt ? JSON.parse(storedJwt) : null;


interface AsyncState {
    isLoading : boolean
    isSuccess : boolean
    isError : boolean
}

interface AuthState extends AsyncState {
    user?: DisplayUser | null 
    jwt?: Jwt  
    isAuthenticated?: boolean
}

const initialState : AuthState = {
    user ,
    jwt ,
    isAuthenticated: false,
    isLoading : false,
    isSuccess : false,
    isError : false,
}



export const register =  createAsyncThunk('auth/register',async (user: NewUser, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        return thunkAPI.rejectWithValue('Unable to register')
    }
})
export const login =  createAsyncThunk('auth/login',async (user: LoginUser, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue('Unable to Login')
    }
})

export const verifyJwt =  createAsyncThunk('auth/verify-jwt',async (jwt: string, thunkAPI) => {
    try {
        return await authService.verifyJwt(jwt)
    } catch (error) {
        return thunkAPI.rejectWithValue('Can not verify token')
    }
})

export const logout =  createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})
export const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers : {
        reset : (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },

    extraReducers : (builder) => {
        // REGISTER
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        }).addCase(register.fulfilled, (state , action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        }).addCase(register.rejected, (state ) => {
            state.isLoading = false;
            state.isError = true;
            state.user = null
        })

         // LOGIN
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state , action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.jwt = action.payload.jwt
            state.user = action.payload.user
            state.isAuthenticated = true;
            
        }).addCase(login.rejected, (state ) => {
            state.isLoading = false;
            state.isError = true;
            state.user = null
            state.isAuthenticated = false;
        })

        // VERIFY TOKEN
        builder.addCase(verifyJwt.pending, (state) => {
            state.isLoading = true
        }).addCase(verifyJwt.fulfilled, (state , action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isAuthenticated = action.payload;
        }).addCase(verifyJwt.rejected, (state ) => {
            state.isLoading = false;
            state.isError = true;
            state.isAuthenticated = false;
        })
        // LOGOUT
        builder.addCase(logout.pending, (state) => {
            state.user = null
            state.jwt = null;
            state.isAuthenticated = false;

        })
    }
})

export const { reset } = authSlice.actions;
export const selectedUser = (state : RootState) =>{
    return  state.auth
}


export default authSlice.reducer

