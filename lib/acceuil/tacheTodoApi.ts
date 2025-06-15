import { api } from "../auth/axios";
import { StatutsTacheTodo, TacheTodo } from "./types";

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
            await api.post(`/business_processes/tache_todos/${todo.id}/terminer/`);
            todo.statut = StatutsTacheTodo.TERMINEE
            return todo;
        } catch (error) {
            console.error("Failed to terminate task:", error);
            return null;
        }
    }
}