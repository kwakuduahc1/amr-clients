export interface Hospitals {
    hospitalsID: number;
    hospitalName: string;
    longitude: number;
    latitude: number;
    type: string;
    patientDetails?: PatientDetails[];
}

export interface Organisms {
    organismsID: number;
    organism: string;
    type: string;
}

export interface CultureAntibiotics {
    cultureAntibioticsID: number;
    antibiotic: string;
    groupName: string;
    reports: Reports[];
}

export interface PatientDetails {
    patientDetailsID: number;
    hospitalsID: number;
    gender: string;
    age: number;
    patientType: string;
    loS: number;
    outcome: string;
    diagnoses: Diagnoses[];
    antibiotics: Antibiotics[];
    reports: Reports[];
    dateAdded: Date;
    dateDone: Date;
    concurrency?: number[];
}

export interface Reports {
    reportsID: number;
    organismsID: number;
    patientDetailsID: number;
    antibioticsID: number;
    results: string;
    patientDetails?: PatientDetails;
    cultureAntibiotics?: CultureAntibiotics;
    organisms?: Organisms;
}

export interface Antibiotics {
    antibioticsID: number;
    drugName: string;
    actualName?: string;
    drugClass?: string;
}

export interface Diagnoses {
    diagnosesID: number;
    diagnosis: string;
    icdCode?: string;
}

export interface SensitivityResult {
    organism: string;
    antibiotic: string;
    total: number;
    sentivity: string;
}

export interface HospitalDiagnosisVm {
    diagnosis: string;
}