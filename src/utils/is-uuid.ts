import {validate} from "uuid";

export const isUuid = (s: string) => validate(s);