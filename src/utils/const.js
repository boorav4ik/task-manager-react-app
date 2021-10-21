export const ERROR = "error";
export const SUCCESS = "ok";

export const SUCCSES_MESSAGES = {
    login: "Добро пожаловать",
    create: "Задача успешно добавлена",
    edit: "Задача успешно изменена",
};

export const FIELDS = {
    username: "Name",
    email: "E-mail",
    text: "Task discription",
    password: "Password",
    token: "Kyкисы",
};

export const loginFieldList = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password", type: "password" },
];

export const createTaskFieldList = [
    { name: "username", label: "Name" },
    { name: "email", label: "E-mail" },
    { name: "text", label: "Task discription", rows: 4, multiline: true },
];
