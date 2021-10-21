import { ERROR } from "../const";

export default function (data = {}) {
    return {
        result: data.status ?? ERROR,
        message: data.message ?? {},
    };
}
