export interface Hospitals {
    hospitalsID: number;
    longitude: number;
    latitude: number;
    hospitalName: string;
}

export interface Organisms {
    organismsID: number;
    organism: string;
    type: string;
}

export interface CultureResults {
    antibiotics: Antibiotics[];
    diagnoses: Diagnoses[];
    resultsID: number;
    organismsID: number;
    hospitalsID: number;
    age: number;
    loS: number;
    dateAdded: string;
    dateDone: string;
    outcome: string;
    patientType: string;
    gender: string;
    results: 'Resistant' | "Sensitive" | "Indeterminate";
    concurrency: string;
}

export interface Antibiotics {
    drugName: string;
    actualName: string | null;
    drugClass: string | null;
}

export interface Diagnoses {
    diagnosis: string;
    iCDCode: string | null;
}