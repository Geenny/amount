import { App } from "./app/App";

const task = document.currentScript.getAttribute( 'task' );
const view = document.currentScript.getAttribute( 'view' );

const parameters: any = { task, view };

if ( parameters.view ) {
    new App();

    
}

