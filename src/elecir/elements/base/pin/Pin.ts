import { pins } from "elecir/controls/storage/pins";
import { Element } from "../element/Element";
import { PinOptionsType } from "./types";
import { Signal } from "../signal/Signal";

/**
 * One Way connector between
 */
export class Pin {

    #name: string = "~";
    #element: Element;
    #pin?: Pin;
    #signal?: Signal;

    constructor( options: PinOptionsType ) {
        this.#name = options.name || this.#name;
        this.#element = options.element;
        this.#pin = options.pin;
    }

    get isFree(): boolean { return !this.#pin; }

    get name(): string | undefined { return this.#name; }
    set name( name: string | undefined ) {
        const isEditable = name && name.length > 0;
        if ( isEditable ) this.#name = name;
    }

    get element(): Element { return this.#element; }
    get pin(): Pin | undefined { return this.#pin; }


    //
    // SIGNAL
    //

    get signal(): Signal { return this.#signal; }
    set signal( signal: Signal ) {
        if ( this.#signal && this.#signal !== signal )
            debugger;
        this.#signal = signal;
        this.tick();
    }

    tick(): void {
        if ( !this.#signal ) return;

        if ( !this.isFree ) {
            if ( this.#signal !== this.#element.signal ) {
                this.#pin.signal = this.#signal;
            } else if ( this.#signal !== this.#pin.signal ) {
                this.#element.tick( this );
            }
        }
    }


    //
    // LINK
    //

    link( pin: Pin ): boolean {
        if ( this.#pin === pin ) {
            console.warn( `Pin of ${ this.#element.name }: trying to set same pin` );
            return false;
        }

        this.#pin = pin;

        return true;
    }
    unlink(): void {
        this.#pin = undefined;
    }


    //
    // DESTROY
    //

    destroy(): void {
        this.unlink();
        this.#element = undefined;

        pins.destroy( this );
    }

}