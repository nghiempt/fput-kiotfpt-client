import Cookie from "js-cookie";
import { API } from "./_api";

const getAllProvinces = async () => {
    try {
        const response = await fetch(API.GET_ALL_PROVINCES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

const getAllDistrictsByProvinceID = async (provinceID: any) => {
    try {
        const response = await fetch(API.GET_DISTRICT_BY_PROVINCE + `/${provinceID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

export const AddressService = {
    getAllProvinces,
    getAllDistrictsByProvinceID
}