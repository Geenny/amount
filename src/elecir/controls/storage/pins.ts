import { Unique } from "elecir/core/Unique";
import { Pin, Element } from "elecir/elements";
import { PinOptionsType, PinSchemeType } from "elecir/elements/base/pin/types";

class PinStorage {

    list: Pin[] = [];
    unique: Unique = new Unique(1);

    create( ID: number, element: Element, scheme?: PinSchemeType ): Pin | undefined {
        const existPin = this.list.find( item => item.ID === ID && item.element === element );
        if ( existPin ) {
            console.warn( `PinStorage: Pin ${ existPin.name } of Element ${ element.name } already exists` );
            return undefined;
        }

        const options = this.pinOptionsBySchemeGet( ID, element, scheme );
        const pin = new Pin( options );

        return this.#addToList( pin ) ? pin : undefined;
    }

    destroy( instance: Pin ): boolean {
        const success = this.#removeFromList( instance );
        if ( !success )
            console.log( `PinStorage: Pin ${ instance.name } of Element ${ instance.element.name } not found` );
        return false;
    }


    //
    // PIN MANAGMENT
    //
    pinOptionsBySchemeGet( ID: number, element: Element, scheme?: PinSchemeType ): PinOptionsType {
        const name = scheme?.name || (ID + 1).toString();
        const storageID = this.unique.next();

        return { ID, storageID, name, element };
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