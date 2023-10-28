import request from "@/utils/request";


export function apiGetMyMainCard() {
    return request({
        url: "/api/card/getMyMainCard",
        method: "get"
    });
}