import { api } from "@/lib/auth/axios"
import { Patient } from "./types"


export default {
  getAll: async function (): Promise<Patient[]> {
    try {
      const response = await api.get('business_processes/patients/')
      const patients: Patient[] = response.data
      return patients
    } catch (error) {
      console.error("Unable to fetch patients")
      console.error(error)
      return []
    }
  },

  create: async function (patientData: Omit<Patient, "id">): Promise<"success" | "failure"> {
    try {
      await api.post('business_processes/patients/', patientData)
      return "success"
    } catch (error) {
      console.error("Failed to create patient")
      console.error('Payload:', patientData)
      console.error(error)
      return "failure"
    }
  }
}
