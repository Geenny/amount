export class Unique {

    #counter: number;

    constructor( start: number = 0 ) {
        this.currentSet( start );
    }

    next(): number {
        return this.#counter ++;
    }

    currentSet( value: number ): void {
        if ( typeof value !== "number" || value <= this.#counter ) return;
        this.#counter = value;
    }

}