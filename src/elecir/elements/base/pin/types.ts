import { Pin } from "./Pin";
import { Element } from "../element/Element";

type PinSchemeType = { ID?: number, IDToPin?: number };
type PinOptionsType = { name?: string, element: Element, pin?: Pin };

export { PinOptionsType, PinSchemeType };