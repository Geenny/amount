import { PinSchemeType } from "../pin/types";
import { Element } from "./Element";
import { ElementMode } from "./enums";

type ElementOptionsType = { id?: number, name: string, type?: string, mode?: ElementMode, pins?: PinSchemeType[] };

export { ElementOptionsType };