import { api } from "../auth/axios";
import { StatutsTacheTodo, TacheTodo, TacheTodoCreate } from "./types";

export default {
    getAll: async function(): Promise<TacheTodo[]> {
        try {
            const response = await api.get('business_processes/tache_todos/');
            return response.data as TacheTodo[]
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            return [];
        }
    },

    terminer: async function(todo: TacheTodo): Promise<TacheTodo | null> {
        try {
            await api.post(`/business_processes/tache_todos/${todo.slug}/terminer/`);
            todo.statut = StatutsTacheTodo.TERMINEE
            return todo;
        } catch (error) {
            console.error("Failed to terminate task:", error);
            return null;
        }
    },

    reopen: async function(todo: TacheTodo): Promise<TacheTodo | null> {
        try {
            await api.post(`/business_processes/tache_todos/${todo.slug}/reopen/`);
            todo.statut = StatutsTacheTodo.A_FAIRE
            return todo;
        } catch (error) {
            console.error("Failed to reopen task:", error);
            return null;
        }
    },
    
    create: async function(todoPayload: TacheTodoCreate): Promise<"success" | "failure"> {
        try {
            console.log(todoPayload)
            const response = await api.post('/business_processes/tache_todos/', todoPayload)
            if (response.status == 201) {
                return "success"
            }
            return "failure"
        } catch (error) {
            console.error("Unable to create a todo")
            console.error(error)
            return "failure"
        }
    }
}