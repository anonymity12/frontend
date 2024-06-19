import request from "@/utils/request";


export function apiGetAllMySportRecords() {
    return request({
        url: "/api/sport/getAllMySportRecords",
        method: "get"
    });
}

export function apiGetSportRecordsOfAllUsersRecently() {
    return request({
        url: "/api/sport/getSportRecordsOfAllUsersRecently",
        method: "get"
    });
}
export function apiRecordSportTime(sportTimeObj) {
    return request({
        url: "/api/sport/recordOnce",
        method: "post",
        data: sportTimeObj
    });
}

export function apiGetCompetitorRecords(competitorId) {
    return request({
        url: "/api/sport/getCompetitorRecords/" + competitorId,
        method: "get"
    })
}

export function apiGetAllUserForSportList() {
    return request({
        url: "/api/sport/getAllUserForSportList",
        method: "get"
    })
}