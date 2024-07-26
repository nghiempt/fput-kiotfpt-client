import { API } from "./_api";
import Cookie from "js-cookie";

const getProfile = async () => {
    try {
        const response = await fetch(API.GET_PROFILE, {
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

const updateProfile = async (payload: any) => {
    try {
        const response = await fetch(API.UPDATE_PROFILE, {
            method: "PUT",
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

const getAllNotifications = async () => {
    try {
        const response = await fetch(API.GET_ALL_NOTIFY_BY_ACCOUNT_ID, {
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

const deleteNotify = async (id: string) => {
    try {
        const response = await fetch(API.DELETE_NOTIFY_BY_ID + `/${id}`, {
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

const getAllOrders = async () => {
    try {
        const response = await fetch(API.GET_ALL_ORDER_BY_ACCOUNT_ID, {
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

const getAllTransactions = async () => {
    try {
        const response = await fetch(API.GET_ALLTRANSACTION_BY_ACCOUNT_ID, {
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

const getProductNeedReview = async (accountId: any) => {
    try {
        const response = await fetch(API.GET_PRODUCT_NEED_REVIEW + `?accountId=${accountId}`, {
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

const createReview = async (payload: any) => {
    try {
        const response = await fetch(API.CREATE_REVIEW, {
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

const getProductReviewed = async (accountId: any) => {
    try {
        const response = await fetch(API.GET_PRODUCT_REVIEWED + `?accountID=${accountId}`, {
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

const getAllAddress = async () => {
    try {
        const response = await fetch(API.GET_ALL_ADDRESS_BY_ACCOUNT_ID, {
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

const getAllFavourite = async () => {
    try {
        const response = await fetch(API.GET_ALL_FAVORITE_BY_ACCOUNT_ID, {
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

const createAddress = async (payload: any) => {
    try {
        const response = await fetch(API.CREATE_ADDRESS, {
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

const updatePassword = async (payload: any) => {
    try {
        const response = await fetch(API.UPDATE_PASSWORD, {
            method: "PUT",
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

export const ProfileService = {
    getProfile,
    updateProfile,
    getAllNotifications,
    deleteNotify,
    getAllOrders,
    getAllTransactions,
    getProductNeedReview,
    createReview,
    getProductReviewed,
    getAllAddress,
    getAllFavourite,
    createAddress,
    updatePassword
}