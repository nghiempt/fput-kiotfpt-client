import { API } from "./_api";

const getShopByID = async (id: string) => {
    try {
        const response = await fetch(API.GET_SHOP_BY_ID + `/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodW5nMTYxMzIwMTZAZ21haWwuY29tIiwiaWF0IjoxNzIxNzI2NTQ3LCJleHAiOjE3MjE4MTI5NDd9.6wsM0siJgeoXx8ILpF40SWqRvNUHb9CkJQMc1XS-5XA`,
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
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodW5nMTYxMzIwMTZAZ21haWwuY29tIiwiaWF0IjoxNzIxNzI2NTQ3LCJleHAiOjE3MjE4MTI5NDd9.6wsM0siJgeoXx8ILpF40SWqRvNUHb9CkJQMc1XS-5XA`,
            },
        });
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

export const ShopService = {
    getShopByID,
    getProductByShop
}