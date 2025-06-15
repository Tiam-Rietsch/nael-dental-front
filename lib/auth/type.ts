export type User = {
    username: string;
    id: number;
}

export type UserCreate = {
    username: string
    password: string
}

export type LoginResponse = {
    refresh: string
    access: string
}