import { Unique } from "elecir/core/Unique";
import { Element, IElement, ElementType, ElementOptionsType, ElementOptionsSchemeType, CurrentElement, LinkElement, WireElement, ElementMode } from "elecir/elements";

const MAX_ELEMENTS = 10000;

class ElementStorage {

    list: Element[] = [];
    unique: Unique = new Unique(1);

    create( scheme: ElementOptionsSchemeType ): Element | undefined {
        if ( this.list.length > MAX_ELEMENTS ) {
            console.warn( `ElementStorage: max elements limit (${ MAX_ELEMENTS }) reached` );
            return undefined;
        }

        const ElementClass = this.elementClassByTypeGet( scheme.type );
        const options = this.elementOptionsBySchemeGet( scheme );
        const instance = new ElementClass( options );

        return this.#addToList( instance ) ? instance : undefined;
    }

    destroy( element: Element ): boolean {
        const success = this.#removeFromList( element );
        if ( !success )
            console.log( `ElementStorage: Element ${ element.name } not found` );
        return false;
    }


    //
    // ELEMENT MANAGMENT
    //
    elementClassByTypeGet( type?: ElementType ): typeof Element {
        switch ( type ) {
            case ElementType.CURRENT:
                return CurrentElement;
            
            case ElementType.WIRE:
                return WireElement;

            default:
                return LinkElement;
        }
    }
    elementOptionsBySchemeGet( scheme: ElementOptionsSchemeType ): ElementOptionsType {
        const schemeID = scheme.ID
        const ID = scheme.ID > 0 ? scheme.ID : this.unique.next();
        const type = scheme.type;
        const name = this.elementNameCreate( ID, type, scheme.name );
        const mode = scheme.mode || ElementMode.STATIC;

        return { ID, name, type, mode, pins: scheme.pins };
    }
    elementNameCreate( id: number, type: ElementType, name: string ): string {
        const desc = name || type.toString();
        return `${ desc } ${ id }`;
    }

    // LIST MANAGEMENT
    #addToList( instance: Element ): boolean {
        this.list.push( instance );
        return true;
    }
    #removeFromList( instance: Element ): boolean {
        const index = this.list.indexOf( instance );
        if ( index >= 0 ) {
            this.list.splice( index, 1 );
            return true;
        }
        return false;
    }

}

const elements = new ElementStorage();

export { elements };