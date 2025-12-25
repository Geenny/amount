import { pins } from "elecir/controls/storage/pins";
import { Element } from "../element/Element";
import { PinOptionsType } from "./types";
import { Signal } from "../signal/Signal";
import { IIdentify } from "elecir/core";

/**
 * One Way connector between
 */
export class Pin implements IIdentify {

    readonly ID: number;
    readonly storageID: number;

    #name: string;
    #element: Element;
    #pin?: Pin;
    #signal?: Signal;

    constructor( options: PinOptionsType ) {
        this.ID = options.ID;
        this.storageID = options.storageID;
        this.#name = options.name || this.#name;
        this.#name = options.name || this.#name;
        this.#element = options.element;
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

    #signalSet( signal: Signal ): void {
        this.#signal = signal;
    }


    //
    // TRANSPORT
    //

    receive( source: Element | Pin, signal?: Signal ): void  {
        if ( this.#signal && this.#signal !== signal )
            debugger;
        
        // Nothing to transport
        if ( !signal ) return;
        
        this.#signalSet( signal );

        if ( source instanceof Element ) {
            if ( !this.#pin ) return;

            this.#pin.receive( this, signal );

        } else if ( source instanceof Pin ) {
            if ( this.#pin !== source ) {
                console.error( `Pin: ${ this.name }: Element: ${ this.element.ID }: Imposiable send from the same pin!!!` );
                return;
            }

            this.#element.receive( this, signal );
        }
    }


    //
    // LINK
    //

    link( pin: Pin ): boolean {
        // Can't link to same @Pin
        if ( this === pin ) return false;

        // @Pin already exist
        if ( this.#pin === pin ) return false;

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
        this.#pin = undefined;
        this.#signal = undefined;
        this.#element = undefined;

        // Remove 
        pins.destroy( this );
    }

}
