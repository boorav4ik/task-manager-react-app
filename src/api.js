import axios from "axios";
import { getToken } from "./utils/functions/localstoreFunctions";

export const apiBaseURL = "https://uxcandy.com/~shapoval/test-task-backend/v2";

export const api = axios.create({
    baseURL: apiBaseURL,
});

const developer = "maxonline";

export async function getTasksAndPages(url) {
    const params = { developer };
    try {
        const response = await api.get(url, { params });
        return {
            tasks: response.data.message.tasks,
            totalPageCount: Math.ceil(
                response.data.message.total_task_count / 3
            ),
        };
    } catch (error) {
        console.error(error);
    }
}

export async function loginPost(username, password) {
    try {
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        const config = {
            method: "post",
            url: `/login?developer=${developer}`,
            data: data,
        };

        return await api(config);
    } catch (error) {
        console.error(error);
    }
}

export async function createPost({ username, email, text }) {
    try {
        const data = new FormData();
        data.append("username", username);
        data.append("email", email);
        data.append("text", text);
        const config = {
            method: "post",
            url: `/create?developer=${developer}`,
            data: data,
        };
        return await api(config);
    } catch (error) {
        console.error(error);
    }
}

export async function editPost({ id, text, taskStatus }) {
    try {
        const data = new FormData();
        data.append("id", id);
        data.append("text", text);
        data.append("status", taskStatus);
        data.append("token", getToken());
        const config = {
            method: "post",
            url: `/edit/${id}?developer=${developer}`,
            data: data,
        };
        return await api(config);
    } catch (error) {
        console.error(error);
    }
}
