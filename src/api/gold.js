import request from "@/utils/request";

export function apiGetMyGold() {
    return request({
        url: "/api/gold/queryMine",
        method: "get"
    });
}

export function apiDecreaseMyGold(goldAmountHolder) {
    return request({
        url: "/api/gold/decrease",
        method: "post",
        data: goldAmountHolder
    });
}

export function apiIncreaseMyGold(goldAmountHolder) {
    return request({
        url: "/api/gold/increase",
        method: "post",
        data: goldAmountHolder
    });
}