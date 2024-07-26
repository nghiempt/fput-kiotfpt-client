import { API } from "./_api";
import Cookie from "js-cookie";

const checkout = async (payload: any) => {
    try {
        const response = await fetch(API.CHECKOUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

const getVoucherByShop = async (shopID: any) => {
    try {
        const response = await fetch(API.GET_VOUCHER_BY_SHOP + `?shopID=${shopID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

export const CheckoutService = {
    checkout,
    getVoucherByShop
}