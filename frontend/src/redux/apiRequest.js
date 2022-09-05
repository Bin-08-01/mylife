import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess, logOutFailed,
    logOutStart, logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess
} from "./authSlice";
import {
    deleteUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) =>{
    dispatch(registerStart());
    try {
        await axios.post("/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    }catch (err){
        dispatch(registerFailed());
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT)=>{
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get("/v1/user", {
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(getUsersSuccess(res.data));
    }catch (err){
        dispatch(getUsersFailed());
    }
}

export const deleteUser = async (accessToken, dispatch, navigate, id, axiosJWT)=>{
    dispatch(deleteUsersStart());
    try {
        const res = await axiosJWT.delete("/v1/user/"+id, {
            headers: {token: `Bearer ${accessToken}`},
        });
        dispatch(deleteUsersSuccess(res.data));
        navigate("/");
    }catch (err){
        dispatch(deleteUsersFailed("Delete failed!"));
    }
}

export const logOut = async (accessToken, id, dispatch, navigate, axiosJWT)=>{
    dispatch(logOutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", id ,{
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(logOutSuccess());
        navigate("/login");
    }catch (err){
        dispatch(logOutFailed());
    }
}