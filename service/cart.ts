import { API } from "./_api";

const getCart = async () => {
    try {
        const response = await fetch(API.GET_CART, {
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

export const CartService = {
    getCart,
}