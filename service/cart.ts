import { API } from "./_api";
import Cookie from "js-cookie";

const getCart = async () => {
    try {
        const response = await fetch(API.GET_CART, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

const removeItemInCart = async (id: any) => {
    try {
        const response = await fetch(API.REMOVE_FROM_CART + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

const updateAmountCart = async (id: any, amount: any) => {
    try {
        const response = await fetch(API.UPDATE_AMOUNT + `?itemId=${id}&newAmount=${amount}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

export const CartService = {
    getCart,
    removeItemInCart,
    updateAmountCart
}