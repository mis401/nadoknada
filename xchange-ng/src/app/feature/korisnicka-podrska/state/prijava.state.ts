import { Prijava } from "../models/prijava.model";

export interface PrijavaState {
    prijave: Prijava[];
    error: any;
}

export const initialPrijavaState: PrijavaState = {
    prijave: [],
    error: null,
}
