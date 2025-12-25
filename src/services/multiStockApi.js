import axios from "axios";

const PRODUCTS_API_BASE_URL = import.meta.env.VITE_PRODUCTS_API_BASE_URL;
const UPDATE_PRODUCT_API_URL_COMPLEMENT = "/quantity";
const FIND_PRODUCT_BY_EANCODE_API_URL_COMPLEMENT = "/ean/"

export async function getExpiringSoonProducts({ days, page, limit }) {
    return axios.get(PRODUCTS_API_BASE_URL + "/expiring-soon", {
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