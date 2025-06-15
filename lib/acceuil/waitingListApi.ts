import { api } from "@/lib/auth/axios"
import { WaitingPatient, WaitingPatientCreate } from "./types"

export default {
  getAll: async function (): Promise<WaitingPatient[]> {
    try {
      const response = await api.get('/business_processes/waiting_seats/')
      const waitingList: WaitingPatient[] = response.data
      return waitingList
    } catch (error) {
      console.error("Unable to fetch waiting list")
      console.error(error)
      return []
    }
  },

  create: async function (payload: WaitingPatientCreate): Promise<"success" | "failure"> {
    try {
      console.log(payload)
      await api.post('/business_processes/waiting_seats/', payload)
      return "success"
    } catch (error) {
      console.error("Failed to create waiting seat")
      console.error('Payload:', payload)
      console.error(error)
      return "failure"
    }
  }
}
