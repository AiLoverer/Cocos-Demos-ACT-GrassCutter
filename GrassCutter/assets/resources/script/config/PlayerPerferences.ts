import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;
/**
 * 用户数据类           
 */
@ccclass('PlayerPerferences')
export class PlayerPerferences {
    static setFloat(key: string, value: number) {
        sys.localStorage.setItem(key, value.toString());
    }

    static getFloat(key: string, defaultValue: number = 0): number {
        const value = sys.localStorage.getItem(key);
        return value ? parseFloat(value) : defaultValue;
    }
    
}


