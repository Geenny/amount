import { Unique } from "elecir/core/Unique";
import { Pin } from "elecir/elements";
import { PinOptionsType } from "elecir/elements/base/pin/types";

class PinStorage {

    list: Pin[] = [];
    unique: Unique = new Unique(1);

    create( options: PinOptionsType ): Pin | undefined {
        const isExist = !!this.list.find( item => item.name === options.name && item.element === options.element );
        if ( isExist ) {
            console.warn( `PinStorage: Pin ${ name } of Element ${ options.element.name } already exists` );
            return undefined;
        }

        const pinName = options.name || this.createName();
        const pin = new Pin({ name: pinName, element: options.element, pin: options.pin });

        return this.#addToList( pin ) ? pin : undefined;
    }

    destroy( instance: Pin ): boolean {
        const success = this.#removeFromList( instance );
        if ( !success )
            console.log( `PinStorage: Pin ${ instance.name } of Element ${ instance.element.name } not found` );
        return false;
    }

    createName(): string {
        const id = this.unique.next();
        return `pin_${ id }`;
    }

    // LIST MANAGEMENT
    #addToList( instance: Pin ): boolean {
        this.list.push( instance );
        return true;
    }
    #removeFromList( instance: Pin ): boolean {
        const index = this.list.indexOf( instance );
        if ( index >= 0 ) {
            this.list.splice( index, 1 );
            return true;
        }
        return false;
    }

}

const pins = new PinStorage();

export { pins };