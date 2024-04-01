export interface Participants {
    participantID: number;
    participantName: string;
    locality: string;
    userName?: string;
    age: number;
    gender: string;
    longitude: number;
    latitude: number;
    illnesses?: Illnesses[];
}

export interface Illnesses {
    illnessesID: number;
    userName?: string;
    participantsID: number;
    illnessDate: Date;
    dateAdded: Date;
    symptoms: Symptoms[];
    patientDrugs: PatientDrugs[];
    resolved: boolean;
    participants?: Participants;
    synced: boolean;
}

export interface Symptoms {
    symptom: string;
    symptomDate: Date;
    resolved: boolean;
    dateResolved: Date;
    duration: number;
}

export interface PatientDrugs {
    drugName: string;
    isPrescribed: boolean;
    actualName?: string;
    drugClass?: string;
    imageUrl?: string;
}
