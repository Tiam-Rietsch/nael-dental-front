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
    taskDetailsDialog: DialogsState;
    taskListDialog: DialogsState;
}

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
        setIsOpen: (isOpen) => set((state) => ({
            taskDetailsDialog: { ...state.taskDetailsDialog, isOpen }
        })),
        openDialog: () => set((state) => ({
            taskDetailsDialog: { ...state.taskDetailsDialog, isOpen: true }
        })),
        closeDialog: () => set((state) => ({
            taskDetailsDialog: { ...state.taskDetailsDialog, isOpen: false }
        })),
    },
    taskListDialog: {
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
    },
}));


export type { DialogsState, AcceuilDialogsStore };
export default useAcceuilDialogs;
