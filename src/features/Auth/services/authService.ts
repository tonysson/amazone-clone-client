import axios from "axios";
import { Jwt } from "../models/Jwt";
import jwt_decode from 'jwt-decode'
import { NewUser } from "../models/NewUser"
import { DisplayUser } from './../models/DisplayUser';
import { LoginUser } from './../models/LoginUser';
import { DecodedJwt } from './../models/DecodedJwt';

const register = async (newUser : NewUser): Promise< DisplayUser | null > => {

    const {data} = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/register`, newUser)
    return data
}

const login = async (
  user: LoginUser
): Promise<{jwt : Jwt , user : DisplayUser | null}> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user
  );

  if (response.data) {
    localStorage?.setItem('jwt', JSON.stringify(response.data));
    const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    localStorage?.setItem('user', JSON.stringify(decodedJwt.user));
    return {jwt : response.data , user : decodedJwt.user}
  }
  return {jwt : response.data , user : null}
};


const verifyJwt = async (jwt : string): Promise<boolean> => {

    const {data} = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/verify-jwt`, {jwt})
    
     if(!data){
        const jwtExpirationMs = data.exp * 1000
        return jwtExpirationMs > Date.now()
     }

     return false
}


const logout =  () : void => {
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
}

const authService = {
    register,
    login,
    logout,
    verifyJwt
}

export default authService