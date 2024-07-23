import { API } from "./_api";

const getAllNotifications = async () => {
    try {
        const response = await fetch(API.GET_ALL_NOTIFY_BY_ACCOUNT_ID, {
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

const deleteNotify = async (id: string) => {
    try {
        const response = await fetch(API.DELETE_NOTIFY_BY_ID + `/${id}`, {
            method: "DELETE",
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

const getAllOrders = async () => {
    try {
        const response = await fetch(API.GET_ALL_ORDER_BY_ACCOUNT_ID, {
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

const getAllTransactions = async () => {
    try {
        const response = await fetch(API.GET_ALLTRANSACTION_BY_ACCOUNT_ID, {
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

const getAllAddress = async () => {
    try {
        const response = await fetch(API.GET_ALL_ADDRESS_BY_ACCOUNT_ID, {
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

const getAllFavourite = async () => {
    try {
        const response = await fetch(API.GET_ALL_FAVORITE_BY_ACCOUNT_ID, {
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

export const ProfileService = {
    getAllNotifications,
    deleteNotify,
    getAllOrders,
    getAllTransactions,
    getAllAddress,
    getAllFavourite
}