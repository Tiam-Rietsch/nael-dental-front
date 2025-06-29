import { setAuthData } from "./auth"
import { api } from "./axios"
import { LoginResponse, User, UserCreate } from "./type"

export default {
    login: async function(userPayload: UserCreate): Promise<"success"|"failure"> {
        try {
            const response = await api.post('/auth/login/', userPayload)
            const { access, refresh } = response.data as LoginResponse
            console.log(access, "\n", refresh)
            await setAuthData(access, refresh)

            return "success"
        } catch (error) {
            console.error("Login failed!")
            console.error('payloads used:', userPayload)
            console.error(error)
            return "failure"
        }
    },

    getMe: async function(): Promise<User | null> {
        try {
            const response = await api.get('/auth/users/me/')
            console.log("me: ", response.data)
            const user: User = response.data
            return user
        } catch (error) {
            console.error("Unable to get user")
            console.error(error)
            return null
        }
    },

    getAllUsers: async function(): Promise<User[]> {
        try {
            const response = await api.get('/auth/users/')
            const users: User[] = response.data
            console.log(users)
            return users
        } catch (error) {
            console.error("Unable to get users")
            console.error(error)
            return []
        }
    }
}