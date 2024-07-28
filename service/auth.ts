import { API } from "./_api";
import Cookie from "js-cookie";

const signIn = async (payload: any) => {
    try {
        const response = await fetch(API.SIGN_IN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data?.result) {
            Cookie.set("auth", JSON.stringify(data?.data));
            return data
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

const signUp = async (payload: any) => {
    try {
        const response = await fetch(API.SIGN_UP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

const signOut = async () => {
    try {
        const response = await fetch(API.SIGN_OUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        Cookie.remove("auth");
        return data;
    } catch (err) {
        return false;
    }
};

const forgotPassword = async (email: string) => {
    try {
        const response = await fetch(API.FORGOT_PASSWORD + `/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

export const AuthService = {
    signIn,
    signUp,
    signOut,
    forgotPassword
}