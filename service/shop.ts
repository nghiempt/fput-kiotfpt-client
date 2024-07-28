import { API } from "./_api";

const getShopByID = async (id: string) => {
    try {
        const response = await fetch(API.GET_SHOP_BY_ID + `/${id}`, {
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

const getProductByShop = async (shopID: string, type: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_SHOP + `?shopID=${shopID}&type=${type}&page=${page}&amount=${amount}`, {
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

const getProductByShopCat = async (shopCatID: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_SHOPCAT + `?shopCatID=${shopCatID}&page=${page}&amount=${amount}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        
        return data
    } catch (err) {
        return false;
    }
};

export const ShopService = {
    getShopByID,
    getProductByShop,
    getProductByShopCat
}