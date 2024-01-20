import request from "@/utils/request";


export function apiGetAllMySleepRecords() {
    return request({
        url: "/api/sleep/getAllMySleepRecords",
        method: "get"
    });
}

export function apiGetSleepRecordsOfAllUsersRecently() {
    return request({
        url: "/api/sleep/getSleepRecordsOfAllUsersRecently",
        method: "get"
    });
}
export function apiRecordSleepTime(sleepTimeObj) {
    return request({
        url: "/api/sleep/recordOnce",
        method: "post",
        data: sleepTimeObj
    });
}
