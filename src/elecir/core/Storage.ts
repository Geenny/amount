export class Storage {

    list: Record<string, unknown>[] = [];

    get( name: string ): unknown {
        const item = this.list.find( item => item.name === name );
        return item ? item.value : undefined;
    }

    set( name: string, value: unknown ): void {
        let item = this.list.find( item => item.name === name );
        if ( !item ) item = { name };
        item.value = value;
    }

}