export const HOST = `https://api.kiotfpt.store/v1`;

export const API = {
    // auth
    SIGN_IN: `${HOST}/auth/sign-in`,
    SIGN_UP: `${HOST}/auth/sign-up`,
    // home
    GET_ALL_CATEGORIES: `${HOST}/category/get-all`,
    GET_ALL_BRANDS: `${HOST}/brand/get-all`,
    SEARCH_PRODUCT: `${HOST}/product/search`,
    GET_POPULAR_SHOP: `${HOST}/shop/popular`,
    // shop
    GET_SHOP_BY_ID: `${HOST}/shop`,
    GET_PRODUCT_BY_SHOP: `${HOST}/product/get-by-type-and-shop`,
    // product
    GET_PRODUCT_BY_TYPE: `${HOST}/product/get-by-type`,
    GET_PRODUCT_BY_ID: `${HOST}/product/detail`,
    CREATE_FAVORITE: `${HOST}/favorite/create`,
    // cart
    GET_CART: `${HOST}/cart`,
    // profile
    GET_ALL_NOTIFY_BY_ACCOUNT_ID: `${HOST}/notify/get-all`,
    DELETE_NOTIFY_BY_ID: `${HOST}/notify/delete`,
    GET_ALL_ORDER_BY_ACCOUNT_ID: `${HOST}/order/get-all`,
    GET_ALLTRANSACTION_BY_ACCOUNT_ID: `${HOST}/transaction/get-all`,
    GET_ALL_ADDRESS_BY_ACCOUNT_ID: `${HOST}/address/get-all`,
    GET_ALL_FAVORITE_BY_ACCOUNT_ID: `${HOST}/favourite/get-all`,
};
