import request from "@/utils/request";


export function apiGetMyMainCard() {
    return request({
        url: "/api/card/getMyMainCard",
        method: "get"
    });
}

export function apiGetCardSquareDisplay() {
    return request({
        url: "/api/card-square/listAll",
        method: "get"
    })
}