import { Options } from "../options/Options";
import { IIdentify } from "./interface/IIdentify";

export class Identify extends Options implements IIdentify {

    get ID(): number { return this.options.ID || 0; };

    get name(): string { return this.options.name; }
    set name( name: string | undefined ) {
        const isEditable = name && name.length > 0;
        if ( isEditable ) this.options.name = name;
    }

}