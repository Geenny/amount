import { elements } from "elecir/controls/storage/elements";
import { Element, ElementType } from "elecir/elements";

export class App  {

    constructor() {

        const element1 = elements.create( { type: ElementType.CURRENT, pins: [ { } ] } );
        const element2 = elements.create( { type: ElementType.TRANSISTOR, pins: [ { }, { }, { } ] } );
        const element3 = elements.create( { type: ElementType.WIRE, pins: [ { }, { } ] } );
        const element4 = elements.create( { type: ElementType.DIOD, pins: [ { }, { } ] } );

        console.log( elements.list );

    }

}