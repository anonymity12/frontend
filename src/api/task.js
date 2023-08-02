import request from "@/utils/request";


export function apiGetTasks() {
    return request({
        url: "/api/task/getAll",
        method: "get"
    });
}
export function apiAddTask(title, matrix) {
    return request({
        url: "/api/task/add?title=" + title + "&matrix=" + matrix,
        method: "post"
    });
}

export function apiCancelTask(taskId) {
    return request({
        url: "/api/task/cancel?taskId=" + taskId,
        method: "post"
    });
}

export function apiDoneTask(data) {
    return request({
        url: "/api/task/done",
        method: "post",
        data
    });
}

