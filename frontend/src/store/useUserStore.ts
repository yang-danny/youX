import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const userAPI='http://localhost:3000/api/user';
axios.defaults.withCredentials = true;

type User = {
    name:string;
    email:string;
    phone:number;
    admin:boolean;
    isVerified:boolean;
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    admin:boolean;
    signup: (input:SignupInputState) => Promise<void>;
    login: (input:LoginInputState) => Promise<void>;
    logout:()=> Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    admin:false,
    // signup api implementation
    signup: async (input: SignupInputState) => {
     
        try {
            set({ loading: true });
            const response = await axios.post(`${userAPI}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {   
                toast.success("Signup successfully...");
                set({ loading: false, user: response.data.name, isAuthenticated: true, admin: response.data.admin });
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    login: async (input: LoginInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${userAPI}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) { 
                toast.success("Login successfully...");
                set({ loading: false, user: response.data.name, isAuthenticated: true, admin: response.data.admin });
            }
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response.data.message);  
        }
    },
    // verifyEmail: async (verificationCode: string) => {
    //     try {
    //         set({ loading: true });
    //         const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             set({ loading: false, user: response.data.user, isAuthenticated: true });
    //         }
    //     } catch (error: any) {
    //         toast.success(error.response.data.message);
    //         set({ loading: false });
    //     }
    // },
    // checkAuthentication: async () => {
    //     try {
    //         set({ isCheckingAuth: true });
    //         const response = await axios.get(`${API_END_POINT}/check-auth`);
    //         if (response.data.success) {
    //             set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    //         }
    //     } catch (error) {
    //         set({isAuthenticated: false, isCheckingAuth: false });
    //     }
    // },
    logout: async () => {
    try {
    set({   user: null,
            isAuthenticated: false,
            loading: false,
            admin:false })
            toast.success("Logout successfully...");
    } catch (error:any) {
        toast.error(error);
    }
           
    },
    // forgotPassword: async (email: string) => {
    //     try {
    //         set({ loading: true });
    //         const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             set({ loading: false });
    //         }
    //     } catch (error: any) {
    //         toast.error(error.response.data.message);
    //         set({ loading: false });
    //     }
    // },
    // resetPassword: async (token: string, newPassword: string) => {
    //     try {
    //         set({ loading: true });
    //         const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             set({ loading: false });
    //         }
    //     } catch (error: any) {
    //         toast.error(error.response.data.message);
    //         set({ loading: false });
    //     }
    // },
    // updateProfile: async (input:any) => {
    //     try { 
    //         const response = await axios.put(`${API_END_POINT}/profile/update`, input,{
    //             headers:{
    //                 'Content-Type':'application/json'
    //             }
    //         });
    //         if(response.data.success){
    //             toast.success(response.data.message);
    //             set({user:response.data.user, isAuthenticated:true});
    //         }
    //     } catch (error:any) { 
    //         toast.error(error.response.data.message);
    //     }
    // }
}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
    }
))