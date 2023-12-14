import request from "@/utils/request";

export function apiGetMyGold() {
    return request({
        url: "/api/gold/queryMine",
        method: "get"
    });
}
