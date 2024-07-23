import { API } from "./_api";

const getProductByType = async (type: string, page: number, amount: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_TYPE + `?type=${type}&page=${page}&amount=${amount}`, {
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

const getProductByID = async (id: number) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_ID + `/${id}`, {
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

const createFavourite = async (productID: number) => {
    try {
        const response = await fetch(API.CREATE_FAVORITE + `?productID=${productID}`, {
            method: "POST",
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

export const ProductService = {
    getProductByType,
    getProductByID,
    createFavourite
}