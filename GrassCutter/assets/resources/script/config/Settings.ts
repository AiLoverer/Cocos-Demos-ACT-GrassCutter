import { _decorator, Component, Node, math ,EventTarget} from 'cc';
import { PlayerPerferences } from './PlayerPerferences';
import { Events } from '../events/Events';
const { ccclass, property } = _decorator;

@ccclass('Settings')
export class Settings extends EventTarget{
    private static _instance: Settings;
    static get instance(): Settings {
        if (!this._instance) {
            this._instance = new Settings();
        }
        return this._instance;
    }

    // 背景音量
    private _bgmVolume: number = 0.5;
    get bgmVolume(): number {
        return this._bgmVolume;
    }
    set bgmVolume(value: number) {
        this._bgmVolume = math.clamp01(value);
        PlayerPerferences.setFloat('bgmVolume', value);
        this.emit(Events.onBgmVolumeChanged, this._bgmVolume);
    }
    
    // 音效音量
    private _effectVolume: number = 0.5;
    get effectVolume(): number {
        return this._effectVolume;
    }
    set effectVolume(value: number) {
        this._effectVolume = math.clamp01(value);
        PlayerPerferences.setFloat('effectVolume', value);
        this.emit(Events.onEffectVolumeChanged, this._effectVolume);
    }

    load() {
        this._bgmVolume = PlayerPerferences.getFloat('bgmVolume', 0.5);
        if(isNaN(this._bgmVolume)) {
            this._bgmVolume = 0.5;
        }
        this._effectVolume = PlayerPerferences.getFloat('effectVolume', 0.5);
        if(isNaN(this._effectVolume)) {
            this._effectVolume = 0.5;
        }
    }
}


