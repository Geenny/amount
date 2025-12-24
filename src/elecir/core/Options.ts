export class Options {

    _options: Record<string, any>;

    constructor( options: Record<string, any> ) {
        this.optionsSet( options );
    }

    set( name: string, value: any ): void {
        // if ( !this._options.hasOwnProperty( name ) ) {
        //     console.warn( `${ this.constructor.name }: Property '${ name }' is not defined.` );
        //     return false;
        // }

        // if ( typeof value !== typeof this._options[ name ] ) {
        //     console.warn( `${ this.constructor.name }: Property '${ name }' type mismatch.` );
        //     return false;
        // }

        this._options[ name ] = value;
    }


    //
    // OPTIONS
    //
    optionsSet( options: Record<string, any> ): void {
        if ( !options ) return;
        if ( !this._options ) this._options = {};

        for ( const name in options )
            this.set( name, options[ name ] );
    }


    //
    // CLONE
    //
    clone(): Options {
        const ClassSelf = this.constructor as any;
        const options = this.cloneOptions();
        const instance = new ClassSelf( { ...options } );

        return instance;
    }
    cloneOptions(): Record<string, any> {
        const options = this._options || {};
        return { ...options };
    }

}