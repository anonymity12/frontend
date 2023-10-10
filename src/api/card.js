import request from "@/utils/request";


export function apiGetMainCard() {
    return request({
        url: "/api/card/getMyMainCard",
        method: "get"
    });
}