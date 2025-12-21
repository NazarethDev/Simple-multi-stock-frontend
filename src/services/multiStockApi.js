import axios from "axios";

const PRODUCTS_API_BASE_URL = import.meta.env.VITE_PRODUCTS_API_BASE_URL;

export async function getExpiringSoonProducts() {
    return axios.get(PRODUCTS_API_BASE_URL + "/expiring-soon");
};

export async function createNewProduct(data) {
    return axios.post(PRODUCTS_API_BASE_URL, data);
};

export async function updateProduct(productId, data) {
    return axios.put(PRODUCTS_API_BASE_URL + "/" + productId, data);
};

export async function getCriticalDays() {
    return axios.get(PRODUCTS_API_BASE_URL + "criticalDays")
};