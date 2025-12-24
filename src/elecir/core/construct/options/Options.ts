import { IOptions } from "./interface/IOptions";

export class Options implements IOptions {

    options: Record<string, any>;

    constructor( options: Record<string, any> ) {
        this.optionsSet( options );
    }


    //
    // VALUE
    //
    set( name: string, value: any ): void {
        this.options[ name ] = value;
    }


    //
    // OPTIONS
    //
    optionsSet( options: Record<string, any> ): void {
        if ( !options ) return;
        if ( !this.options ) this.options = {};

        for ( const name in options )
            this.set( name, options[ name ] );
    }


    //
    // CLONE
    //
    clone(): Options {
        const ClassSelf = this.constructor as any;
        const options = this.cloneOptions();
        const instance = new ClassSelf( { ... options } );

        return instance;
    }
    cloneOptions(): Record<string, any> {
        const options = this.options || {};
        return { ...options };
    }

}