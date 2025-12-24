import { ElementType } from "elecir/elements/enums";
import { PinSchemeType } from "../pin/types";
import { ElementMode } from "./enums";

type ElementOptionsSchemeType = { ID?: number, name?: string, type: ElementType, mode?: ElementMode, pins?: PinSchemeType[] };
type ElementOptionsType = { ID: number, name: string, type: ElementType, mode?: ElementMode, pins?: PinSchemeType[] };

export { ElementOptionsType, ElementOptionsSchemeType };