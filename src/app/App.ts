import { elements } from "elecir/controls/storage/elements";
import { Element, ElementType } from "elecir/elements";

export class App  {

    constructor() {

        const element1 = elements.create( { type: ElementType.CURRENT, pins: [ { } ] } );
        const element2 = elements.create( { type: ElementType.TRANSISTOR, pins: [ { }, { }, { } ] } );
        const element3 = elements.create( { type: ElementType.WIRE, pins: [ { }, { } ] } );

        console.log( elements.list );

    }

}