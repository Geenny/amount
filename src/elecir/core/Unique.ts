export class Unique {

    counter: number;

    constructor( startFrom: number = 0 ) {
        this.counter = startFrom;
    }

    next(): number {
        return this.counter ++;
    }

}