import { IIdentify, IOptions } from "elecir/core";
import { Pin } from "../../pin/Pin";
import { Signal } from "../../signal/Signal";

export interface IElement extends IIdentify, IOptions {

    readonly signal: Signal;

    readonly pins: Pin[];

}