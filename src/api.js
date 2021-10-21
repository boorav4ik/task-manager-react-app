import axios from "axios";
import { toast } from "react-toastify";
import parseResponseData from "./utils/functions/parseResponseData";
import { ERROR, SUCCESS, SUCCSES_MESSAGES, FIELDS } from "./utils/const";

export const apiBaseURL = "https://uxcandy.com/~shapoval/test-task-backend/v2";

export const api = axios.create({
    baseURL: apiBaseURL,
});

const developer = "Example";

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
        toast.error(error);
        return { tasks: [], totalPageCount: 0 };
    }
}

export async function post(requestParams, dataFields) {
    const { prefix, id } = requestParams;

    const data = new FormData();
    Object.keys(dataFields).forEach((key) => {
        data.append(key, dataFields[key]);
    });

    const config = {
        method: "post",
        url: `/${prefix}${id ? `/${id}` : ""}?developer=${developer}`,
        data: data,
    };
    try {
        const response = await api(config);

        const { result, message } = parseResponseData(response.data);
        switch (result) {
            case ERROR:
                Object.keys(message).forEach((key) => {
                    toast.error(`${FIELDS[key]}: ${message[key]}`);
                });
                break;
            case SUCCESS:
                toast.success(SUCCSES_MESSAGES[prefix]);
                break;
            default:
                break;
        }
        return { result, message };
    } catch (error) {
        toast.error(error);
        return parseResponseData();
    }
}
