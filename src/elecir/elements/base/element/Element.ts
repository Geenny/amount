import { ElementMode } from "./enums";
import { ElementOptionsType } from "./types";
import { Pin } from "../pin/Pin";
import { Signal } from "../signal/Signal";
import { PinOptionsType, PinSchemeType } from "../pin/types";
import { elements } from "elecir/controls/storage/elements";
import { pins } from "elecir/controls/storage/pins";
import { Identify } from "elecir/core";
import { IElement } from "./interface/IElement";

export class Element extends Identify implements IElement {

    pins: Pin[] = [];
    signal: Signal;

    constructor( options: ElementOptionsType ) {
        super( options );

        this.create();
    }


    //
    // GET/SET
    //

    get name(): string { return this.options.name; }
    set name( name: string | undefined ) {
        const isEditable = name && name.length > 0;
        if ( isEditable ) this.options.name = name;
    }

    get mode(): ElementMode { return this.options.mode || ElementMode.STATIC; }


    //
    // CREATE
    //
    create(): void {
        this.pinsCreateFromOptions();
        this.signalCreate();
    }

    //
    // PINS
    //

    isExistPin( pin: Pin ): boolean { return this.pins.includes( pin ); }

    pinsCreateFromOptions(): void {
        const pins = this.options.pins;
        if ( !pins || pins.length === 0 ) return;

        pins.forEach( ( scheme: PinSchemeType, index: number ) => this.pinCreate( index, scheme ) );
    }
    pinCreate( index: number, scheme: PinSchemeType ): void {
        const pin = pins.create( index, this, scheme );
        if ( !pin ) debugger;
        this.pins.push( pin );
    }


    //
    // SIGNAL
    //
    signalCreate() {
        const options = { speed: 0, potential: 5, element: this };
        this.signal = new Signal( options );
    }


    //
    // TRANSPORT
    //

    receive( pin: Pin, signal: Signal ): void {
        if ( !pin || !signal ) return;

        if ( !this.isExistPin( pin ) ) {
            console.warn( `Element: ${ this.ID }: Pin Element: ${ pin.element }: Pin from other Element!!!` );
            return;
        }

        if ( pin.element === this ) {
            console.warn( `Element ${ this.name }: Short circuit!` );
            return;
        }

        const options = signal.cloneOptions();
        if ( options.element ) delete options.element;
        this.signal.optionsSet( options );

        // this.tickProcess( pin );
    }


    //
    // TICK
    //
    // tick(): void {
    //     if ( !pin || !pin.signal ) return;

    //     if ( pin.element === this ) {
    //         console.warn( `Element ${ this.name }: short circuit!` );
    //         return;
    //     }

    //     const options = pin.signal.cloneOptions();
    //     if ( options.element ) delete options.element;
    //     this.signal.optionsSet( options );

    //     this.tickProcess( pin );
    // }
    // tickProcess( pin: Pin ): void {
    //     for ( let i = 0; i < this.pins.length; i++ ) {
    //         const instance = this.pins[ i ];
    //         if ( instance === pin ) continue;
    //         instance.signal = this.signal;
    //     }
    // }


    //
    // DESTROY
    //
    destroy(): void {
        this.destroyPins();
        elements.destroy( this );
    }
    destroyPins(): void {
        while ( this.pins.length > 0 ) {
            const pin = this.pins.pop();
            pin.destroy();
        }
    }

}