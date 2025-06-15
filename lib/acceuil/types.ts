import { User } from "../auth/type";

export enum StatutsTacheTodo {
    A_FAIRE = 'A faire',
    EN_COURS = 'En cours',
    TERMINEE = 'Terminée',
    ANNULEE = 'Annulée',
}

export enum CategoriesTacheTodo {
    ADMINISTRATIVE = 'Administrative',
    CLINIQUE = 'Clinique',
    COMPTABLE = 'Comptable'
}

export enum SexePatient {
    HOMME = "Homme",
    FEMME = "Femme",
}

export type TacheTodo = {
    id: number;
    titre: string;
    description: string;
    autheur: User | null;
    categorie: CategoriesTacheTodo;
    statut: StatutsTacheTodo;
    date_creation: Date;
    echeance: Date;
    requierant: User | null;
    executant: User | null;
    slug: string;
}

export type TacheTodoCreate = {
    titre: string;
    description: string;
    categorie: CategoriesTacheTodo;
    statut: StatutsTacheTodo;
    echeance: Date;
    id_requierant: string;
    id_executant: string;
    id_autheur: string;
}

export type Patient = {
    nom: string,
    prenom: string,
    date_de_naissance: Date,
    telephone: number,
    sexe: SexePatient
}

export type WaitingPatient = {
    id: number;
    patient: Patient
    date_created: string
    motif: string
}

export type WaitingPatientCreate = {
    nom: string,
    prenom: string,
    date_de_naissance: Date,
    telephone: string,
    sexe: SexePatient
    date_created: string
    motif: string
}