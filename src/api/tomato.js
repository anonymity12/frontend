import request from "@/utils/request";

export function apiFinishTomato() {
    return request({
        url: "/api/tomato/finish",
        method: "post"
    });
}
export function apiGetTodayTomatoCounts() {
    return request({
        url: "/api/tomato/queryTodayCounts",
        method: "get"
    })
}
export function apiGetTotalTomatoCounts() {
    return request({
        url: "/api/tomato/queryTotalCounts",
        method: "get"
    })
}
// this api is provide by spring and redis, key looks like: tt:tomato:newestddl: 2023-12-19 19:56
export function apiCalcLeftTimer() {
    return request({
        url: "/api/tomato/calcLeftTimer",
        method: "get"
    })
}
