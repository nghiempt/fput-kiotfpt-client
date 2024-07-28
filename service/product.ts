import { API } from "./_api";
import Cookie from "js-cookie";

const searchProduct = async (key: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.SEARCH_PRODUCT + `?key=${key}&page=${page}&amount=${amount}`, {
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

const getProductByType = async (type: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_TYPE + `?type=${type}&page=${page}&amount=${amount}`, {
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

const getProductByBrand = async (brandID: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_BRAND + `?brandID=${brandID}&page=${page}&amount=${amount}`, {
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

const getProductByCategory = async (categoryID: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_CATEGORY + `?categoryID=${categoryID}&page=${page}&amount=${amount}`, {
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

const addProductToCart = async (payload: any) => {
    try {
        const response = await fetch(API.ADD_TO_CART, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

const getProductByID = async (id: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_ID + `/${id}`, {
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

const createFavourite = async (productID: number) => {
    try {
        const response = await fetch(API.CREATE_FAVORITE + `?productID=${productID}`, {
            method: "POST",
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

const deleteFavourite = async (productID: number) => {
    try {
        const response = await fetch(API.DELETE_FAVORITE + `/${productID}`, {
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

export const ProductService = {
    searchProduct,
    getProductByType,
    getProductByBrand,
    getProductByCategory,
    getProductByID,
    createFavourite,
    deleteFavourite,
    addProductToCart
}