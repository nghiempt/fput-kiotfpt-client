export const HOST = `https://api.kiotfpt.store/v1`;
export const CLOUDINARY = `https://api.cloudinary.com/v1_1/kiotfpt/image/upload`;

export const API = {
    // auth
    SIGN_IN: `${HOST}/auth/sign-in`,
    SIGN_UP: `${HOST}/auth/sign-up`,
    SIGN_OUT: `${HOST}/auth/sign-out`,
    FORGOT_PASSWORD: `${HOST}/auth/forgot-password`,
    // home
    GET_ALL_CATEGORIES: `${HOST}/category/get-all`,
    GET_ALL_BRANDS: `${HOST}/brand/get-all`,
    SEARCH_PRODUCT: `${HOST}/product/search`,
    GET_POPULAR_SHOP: `${HOST}/shop/popular`,
    // shop
    GET_SHOP_BY_ID: `${HOST}/shop`,
    GET_PRODUCT_BY_SHOP: `${HOST}/product/get-by-type-and-shop`,
    GET_PRODUCT_BY_SHOPCAT: `${HOST}/product/get-by-shop-and-cat`,
    // product
    GET_PRODUCT_BY_TYPE: `${HOST}/product/get-by-type`,
    GET_PRODUCT_BY_ID: `${HOST}/product/detail`,
    GET_PRODUCT_BY_BRAND: `${HOST}/product/get-by-brand`,
    GET_PRODUCT_BY_CATEGORY: `${HOST}/product/get-by-category`,
    CREATE_FAVORITE: `${HOST}/favourite/create`,
    DELETE_FAVORITE: `${HOST}/favourite/delete`,
    // cart
    GET_CART: `${HOST}/cart`,
    ADD_TO_CART: `${HOST}/item/add-to-cart`,
    REMOVE_FROM_CART: `${HOST}/item/delete`,
    UPDATE_AMOUNT: `${HOST}/item/update-amount`,
    // checkout
    CHECKOUT: `${HOST}/order/checkout`,
    GET_VOUCHER_BY_SHOP: `${HOST}/voucher/get-by-shop`,
    // profile
    GET_PROFILE: `${HOST}/profile`,
    UPDATE_PROFILE: `${HOST}/profile/update`,
    GET_ALL_NOTIFY_BY_ACCOUNT_ID: `${HOST}/notify/get-all`,
    DELETE_NOTIFY_BY_ID: `${HOST}/notify/delete`,
    GET_ALL_ORDER_BY_ACCOUNT_ID: `${HOST}/order/get-all`,
    GET_ALLTRANSACTION_BY_ACCOUNT_ID: `${HOST}/transaction/get-all`,
    GET_PRODUCT_NEED_REVIEW: `${HOST}/product/products-no-comments`,
    CREATE_REVIEW: `${HOST}/comment/create`,
    GET_PRODUCT_REVIEWED: `${HOST}/comment/get-all`,
    GET_ALL_ADDRESS_BY_ACCOUNT_ID: `${HOST}/address/get-all`,
    GET_ALL_FAVORITE_BY_ACCOUNT_ID: `${HOST}/favourite/get-all`,
    CREATE_ADDRESS: `${HOST}/address/create`,
    SET_DEFAULT_ADDRESS: `${HOST}/address/set-default`,
    UPDATE_PASSWORD: `${HOST}/profile/update-password`,
    GET_ALL_PROVINCES: `${HOST}/address/province/get-all`,
    GET_DISTRICT_BY_PROVINCE: `${HOST}/address/district/get-all-by-province`,
    CANCEL_ORDER: `${HOST}/order/update`,
};
