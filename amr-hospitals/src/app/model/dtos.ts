export interface Hospitals {
    hospitalsID: number;
    longitude: number;
    latitude: number;
    hospitalName: string;
    type: string;
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
    hospitalsID: number;
    age: number;
    loS: number;
    dateAdded: string;
    dateDone: string;
    outcome: string;
    patientType: string;
    gender: string;
    concurrency: string;
    reports: Reports[]
}

export interface Antibiotics {
    antibioticsID: number;
    drugName: string;
    actualName: string | null;
    drugClass: string | null;
}

export interface Diagnoses {
    diagnosisID: number;
    diagnosis: string;
    iCDCode: string | null;
}

export interface Reports {
    reportsID: number;
    organismsID: number;
    antibioticsID: number;
    results: 'Resistant' | "Sensitive" | "Indeterminate";
}
