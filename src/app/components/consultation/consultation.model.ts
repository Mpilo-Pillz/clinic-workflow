export interface Consultation {
    id?: string;
    date?: string;
    diagnosis: string;
    prescription: string;
    imagePath: File | string;
}