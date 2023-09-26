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