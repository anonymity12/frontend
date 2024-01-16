import request from "@/utils/request";


export function apiGetStationsInfoList() {
    return request({
        url: "/api/train/getStationsInfoList",
        method: "get"
    });
}
