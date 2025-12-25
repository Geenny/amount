import { Pin } from "./Pin";
import { Element } from "../element/Element";

// 
type PinSchemeType = { name?: string };
type PinOptionsType = { ID: number, storageID: number, name: string, element: Element };

export { PinOptionsType, PinSchemeType };