import axios from "axios";

const PRODUCTS_API_BASE_URL = import.meta.env.VITE_PRODUCTS_API_BASE_URL;
const STATISTICS_API_BASE_URL = import.meta.env.VITE_STATISTICS_API_BASE_URL;

const UPDATE_PRODUCT_API_URL_COMPLEMENT = "/quantity";
const FIND_PRODUCT_BY_EANCODE_API_URL_COMPLEMENT = "/ean/";
const UPDATE_PRODUCT_NAME_AND_COST = "/update-cost-and-name/";
const FIND_EXPIRING_PRODUCTS_LIST = "/expiring-soon";
const FIND_EXPIRED_PRODUCTS_LIST = "/expired-products";
const FIND_EXPIRED_PRODUCTS_QUANTITY_BY_STORE = "/expired-products-by-store";
const FIND_FINANCE_LOSSES = "/expired-products-costs-by-store"

export async function getExpiringSoonProducts({ days, page, limit }) {
    return axios.get(PRODUCTS_API_BASE_URL + FIND_EXPIRING_PRODUCTS_LIST, {
        params: {
            days,
            page,
            limit
        }
    });
};

export async function getExpiredProducts({ days, page, limit }) {
    return axios.get(PRODUCTS_API_BASE_URL + FIND_EXPIRED_PRODUCTS_LIST, {
        params: {
            days,
            page,
            limit
        }
    });
};

export async function createNewProduct(data) {
    return axios.post(PRODUCTS_API_BASE_URL, data);
};

export async function updateProduct(productId, data) {
    return axios.put(PRODUCTS_API_BASE_URL + UPDATE_PRODUCT_API_URL_COMPLEMENT + "/" + productId, data);

};

export async function findByBarCode(eanCode) {
    return axios.get(PRODUCTS_API_BASE_URL + FIND_PRODUCT_BY_EANCODE_API_URL_COMPLEMENT + eanCode)
};

export async function updateNameAndCost(productId, data) {
    return axios.patch(PRODUCTS_API_BASE_URL + "/" + UPDATE_PRODUCT_NAME_AND_COST + productId, data)
}

export async function findExpiredProductsByStore(months) {
    return axios.get(STATISTICS_API_BASE_URL + FIND_EXPIRED_PRODUCTS_QUANTITY_BY_STORE, {
        params: { months }
    });
}

export async function findFinanceLosses(months) {
    return axios.get(STATISTICS_API_BASE_URL + FIND_FINANCE_LOSSES, {
        params: { months }
    });
}