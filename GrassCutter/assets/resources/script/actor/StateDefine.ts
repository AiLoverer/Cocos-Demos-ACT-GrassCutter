import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StateDefine')
export enum StateDefine {
    Idle = "idle",

    Attack = "attack",

    Hit = "hit",

    Run = "run",

    Die = "die"
}


