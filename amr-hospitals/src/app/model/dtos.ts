import { IUsers } from "./IUsers";

export interface Wards {
    wardsID: number;
    ward: string;
    capacity: number;
    oxygen: number;
    concurrency: string;
    wardStates: WardStates[] | null;
}

export interface WardStates {
    ward: string;
    wardStatesID: number;
    wardsID: number;
    beds: number;
    oxygens: number;
    dateDone: string;
    userName: string;
    wards: Wards | null;
    concurrency: string;
}

export interface AddWardStateVm {
    wardsID: number;
    beds: number;
    oxygens: number;
}

export interface WardStateVm {
    wardStatesID: number;
    wardsID: number;
    beds: number;
    oxygen: number;
    dateDone: string;
    userName: string;
}

export interface WardStateInfo {
    wardsID: number;
    ward: string;
    capacity: number;
    beds: number;
    oxygens: number;
}

export interface Teams {
    teamsID: number;
    team: string;
    members: IUsers[];
    concurrency: string;
}

export interface AddTeamVm {
    team: string;
}

export interface EditTeamVm {
    teamsID: number;
    team: string;
}

export interface TeamsVm {
    teamsID: number;
    team: number;
}
export interface PhoneNumbers {
    phoneNumber: string;
}

export interface Schedules {
    schedulesID: number;
    iD: string;
    endTime: string;
    concurrency: string;
    applicationUsers: IUsers;
}

export interface AddScheduleVm {
    id: string;
    shift: string;
    startTime: Date;
}

export interface SchedulesVm {
    schedulesID: number;
    membersID: number;
    endTime: string;
    shit: string;
}