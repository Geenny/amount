import { Unique } from "elecir/core/Unique";
import { Element, ElementOptionsType } from "elecir/elements";

const MAX_ELEMENTS = 10000;

class ElementStorage {

    list: Element[] = [];
    unique: Unique = new Unique(1);

    classGetByType( type?: string ): typeof Element {
        switch ( type ) {
            default:
                return Element;
        }
    }

    create( options: ElementOptionsType ): Element | undefined {
        if ( this.list.length > MAX_ELEMENTS ) {
            console.warn( `ElementStorage: max elements limit (${ MAX_ELEMENTS }) reached` );
            return undefined;
        }

        const ElementClass = this.classGetByType( options.type );
        const id = this.unique.next();
        options.id = id;
        options.name = this.createName( id, options.name );
        const instance = new ElementClass( options );

        return this.#addToList( instance ) ? instance : undefined;
    }

    destroy( element: Element ): boolean {
        const success = this.#removeFromList( element );
        if ( !success )
            console.log( `ElementStorage: Element ${ element.name } not found` );
        return false;
    }

    createName( id: number, name: string ): string {
        return `${ name } ${ id }`;
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