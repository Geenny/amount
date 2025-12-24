import { Pin } from "./Pin";
import { Element } from "../element/Element";

type PinSchemeType = { name?: string };
type PinOptionsType = { name?: string, element: Element, pin?: Pin };

export { PinOptionsType, PinSchemeType };