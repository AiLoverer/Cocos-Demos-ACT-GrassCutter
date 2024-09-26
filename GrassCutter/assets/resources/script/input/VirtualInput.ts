import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('VirtualInput')
export class VirtualInput {
    private static _horizontal: number = 0;
    private static _vertical: number = 0;

    public static get horizontal(): number {
        return this._horizontal;
    }   

    public static get vertical(): number {
        return this._vertical;
    }

    public static setHorizontal(value: number): void {
        this._horizontal = value;
    }

    public static setVertical(value: number): void {
        this._vertical = value;
    }
}


