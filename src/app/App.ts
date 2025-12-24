import { elements } from "elecir/controls/storage/elements";
import { Element } from "elecir/elements";

export class App  {

    constructor() {

        const element1 = elements.create( { name: "Current", pins: [ { name: "" } ] } );
        const element2 = elements.create( { name: "Transistor", pins: [ { name: "" }, { name: "" }, { name: "" } ] } );
        const element3 = elements.create( { name: "Resistor", pins: [ { name: "" }, { name: "" } ] } );

        const list = elements.list;

    }

}