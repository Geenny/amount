import { Options } from "elecir/core/construct/options/Options";
import { Element } from "../element/Element";
import { SignalType } from "./types";

export class Signal extends Options {

    _options: SignalType;

    constructor( options?: SignalType ) {
        super( options );
    }

    get speed(): number { return this._options.speed; }

    get potential(): number { return this._options.potential; }

    get element(): Element { return this._options.element; }

}