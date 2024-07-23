import { API } from "./_api";

const getAllCategories = async () => {
    try {
        const response = await fetch(API.GET_ALL_CATEGORIES);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

const getAllBrands = async () => {
    try {
        const response = await fetch(API.GET_ALL_BRANDS);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

const searchProduct = async (key: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.SEARCH_PRODUCT + `?key=${key}&page=${page}&amount=${amount}`);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

const getPopularShop = async () => {
    try {
        const response = await fetch(API.GET_POPULAR_SHOP, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodW5nMTYxMzIwMTZAZ21haWwuY29tIiwiaWF0IjoxNzIxNzI2NTQ3LCJleHAiOjE3MjE4MTI5NDd9.6wsM0siJgeoXx8ILpF40SWqRvNUHb9CkJQMc1XS-5XA`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

export const HomeService = {
    getAllCategories,
    getAllBrands,
    searchProduct,
    getPopularShop
}