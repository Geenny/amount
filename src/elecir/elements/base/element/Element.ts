import { Options } from "elecir/core/Options";
import { ElementMode } from "./enums";
import { ElementOptionsType } from "./types";
import { Pin } from "../pin/Pin";
import { Signal } from "../signal/Signal";
import { elements } from "elecir/controls/storage/elements";
import { PinOptionsType, PinSchemeType } from "../pin/types";
import { pins } from "elecir/controls/storage/pins";

export class Element extends Options {

    _pins: Pin[] = [];
    _signal: Signal;

    constructor( options: ElementOptionsType ) {
        super( options );
        this.pinsCreateFromOptions();
        this._signalCreate();
    }

    get id(): number { return this._options.id; }

    get name(): string { return this._options.name; }
    set name( name: string | undefined ) {
        const isEditable = name && name.length > 0;
        if ( isEditable ) this._options.name = name;
    }

    get mode(): ElementMode { return this._options.mode || ElementMode.STATIC; }

    get signal(): Signal { return this._signal; }

    get pins(): Pin[] { return this._pins; }


    //
    // OPTIONS
    //
    // optionsSet( options: ElementOptionsType ): void {
    //     super.optionsSet( options );
    //     this.pinsCreateFromOptions();
    // }


    //
    // PINS
    //
    pinsCreateFromOptions(): void {
        const pins = this._options.pins;
        if ( !pins || pins.length === 0 ) return;

        pins.forEach( ( scheme: PinSchemeType, index: number ) => this.pinCreate( index, scheme ) );
    }
    pinCreate( index: number, scheme: PinSchemeType ): void {
        const name = index.toString();
        const element = this;
        const options: PinOptionsType = { name, element };

        const pin = pins.create( options );
        this._pins.push( pin );
    }


    //
    // SIGNAL
    //
    _signalCreate() {
        const options = { speed: 0, potential: 5, element: this };
        this._signal = new Signal( options );
    }


    //
    // TICK
    //
    tick( pin?: Pin ): void {
        if ( !pin || !pin.signal ) return;

        if ( pin.element === this ) {
            console.warn( `Element ${ this.name }: short circuit!` );
            return;
        }

        const options = pin.signal.cloneOptions();
        if ( options.element ) delete options.element;
        this.signal.optionsSet( options );

        this.tickProcess( pin );
    }
    tickProcess( pin: Pin ): void {
        for ( let i = 0; i < this._pins.length; i++ ) {
            const instance = this._pins[ i ];
            if ( instance === pin ) continue;
            instance.signal = this.signal;
        }
    }


    //
    // DESTROY
    //
    destroy(): void {
        this.destroyPins();
        elements.destroy( this );
    }
    destroyPins(): void {
        while ( this._pins.length > 0 ) {
            const pin = this._pins.pop();
            pin.destroy();
        }
    }

}