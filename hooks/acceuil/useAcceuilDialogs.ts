import { ReprogramAppointmentDialog } from "@/components/medical/acceuil/dialogs/reprogram-appointment-dialog";
import { CategoriesTacheTodo, StatutsTacheTodo, TacheTodo } from "@/lib/acceuil/types";
import { set } from "date-fns";
import { create } from "zustand";


type DialogsState = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    openDialog: () => void;
    closeDialog: () => void;
};

type AcceuilDialogsStore = {
    addTaskDialog: DialogsState;
    addWaitingPatientDialog: DialogsState;
    appointmentDetailsDialog: DialogsState;
    appointmentListDialog: DialogsState;
    memoDialog: DialogsState;
    programAppointmentDialog: DialogsState;
    taskDetailsDialog: DialogsState & { todo: TacheTodo, setTodo: (todo: TacheTodo) => void };
    taskListDialog: DialogsState & { todos: TacheTodo[], setTodos: (todos: TacheTodo[]) => void}
    reprogramAppointmentDialog: DialogsState;
};

const useAcceuilDialogs = create<AcceuilDialogsStore>((set) => ({
    addTaskDialog: {
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            addTaskDialog: { ...state.addTaskDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            addTaskDialog: { ...state.addTaskDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            addTaskDialog: { ...state.addTaskDialog, isOpen: false }
        })),
    },
    addWaitingPatientDialog: {
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            addWaitingPatientDialog: { ...state.addWaitingPatientDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            addWaitingPatientDialog: { ...state.addWaitingPatientDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            addWaitingPatientDialog: { ...state.addWaitingPatientDialog, isOpen: false }
        })),
    },
    appointmentDetailsDialog: {
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            appointmentDetailsDialog: { ...state.appointmentDetailsDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            appointmentDetailsDialog: { ...state.appointmentDetailsDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            appointmentDetailsDialog: { ...state.appointmentDetailsDialog, isOpen: false }
        })),
    },
    appointmentListDialog: {
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            appointmentListDialog: { ...state.appointmentListDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            appointmentListDialog: { ...state.appointmentListDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            appointmentListDialog: { ...state.appointmentListDialog, isOpen: false }
        })),
    },
    memoDialog: {
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            memoDialog: { ...state.memoDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            memoDialog: { ...state.memoDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            memoDialog: { ...state.memoDialog, isOpen: false }
        })),
    },
    programAppointmentDialog: {
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            programAppointmentDialog: { ...state.programAppointmentDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            programAppointmentDialog: { ...state.programAppointmentDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            programAppointmentDialog: { ...state.programAppointmentDialog, isOpen: false }
        })),
    },
    taskDetailsDialog: {
        isOpen: false,
        todo: {
            id: 0,
            titre: '',
            description: '',
            date_creation: new Date(),
            echeance: new Date(),
            statut: StatutsTacheTodo.A_FAIRE,
            categorie: CategoriesTacheTodo.CLINIQUE,
            autheur: null,
            requierant: null,
            executant: null,
            slug: ''
        },
        setIsOpen: (isOpen) => set((state) => ({
            taskDetailsDialog: { ...state.taskDetailsDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            taskDetailsDialog: { ...state.taskDetailsDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            taskDetailsDialog: { ...state.taskDetailsDialog, isOpen: false }
        })),
        setTodo: (todo) => set((state) => ({
            taskDetailsDialog: { ...state.taskDetailsDialog, todo }
        }))
    },
    taskListDialog: {
        todos: [],
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            taskListDialog: { ...state.taskListDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            taskListDialog: { ...state.taskListDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            taskListDialog: { ...state.taskListDialog, isOpen: false }
        })),
        setTodos: (todos) => set((state) => ({
            taskListDialog: { ...state.taskListDialog, todos: todos}
        }))
    },
    reprogramAppointmentDialog: {
        isOpen: false,
        setIsOpen: (isOpen) => set((state) => ({
            reprogramAppointmentDialog: { ...state.reprogramAppointmentDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            reprogramAppointmentDialog: { ...state.reprogramAppointmentDialog, isOpen: true}
        })),
        closeDialog: () => set((state) => ({
            reprogramAppointmentDialog: { ...state.reprogramAppointmentDialog, isOpen: false}
        }))
    }
}));


export type { DialogsState, AcceuilDialogsStore };
export default useAcceuilDialogs;
