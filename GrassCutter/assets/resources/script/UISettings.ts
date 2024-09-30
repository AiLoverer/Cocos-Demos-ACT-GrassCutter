import { _decorator, Component, Node, Slider, ProgressBar, Button, math } from 'cc';
import { UIManager } from './UIManager';
import { Settings } from './config/Settings';
const { ccclass, property } = _decorator;

@ccclass('UISettings')
export class UISettings extends Component {

    sliderBgmVolume : Slider | null = null;

    progressbarBgmVolume : ProgressBar | null = null;

    sliderEffectVolume : Slider | null = null;

    progressbarEffectVolume : ProgressBar | null = null;

    btnClose : Button | null = null;

    start() {
        this.sliderBgmVolume = this.node.getChildByName('BGM').getComponent(Slider);
        if(this.sliderBgmVolume) {
            console.log("get sliderBgmVolume...");
            this.sliderBgmVolume.node.on('slide', this.onBgmVolumeChange, this);
        }
        this.progressbarBgmVolume = this.sliderBgmVolume.node.getChildByName('ProgressBar').getComponent(ProgressBar);

        this.sliderEffectVolume = this.node.getChildByName('SFX').getComponent(Slider);
        if(this.sliderEffectVolume) {
            this.sliderEffectVolume.node.on('slide', this.onEffectVolumeChange, this);
        }
        this.progressbarEffectVolume = this.sliderEffectVolume.node.getChildByName('ProgressBar').getComponent(ProgressBar);

        this.sliderBgmVolume.progress = Settings.instance.bgmVolume;
        this.sliderEffectVolume.progress = Settings.instance.sfxVolume;
        this.progressbarBgmVolume.progress = Settings.instance.bgmVolume;
        this.progressbarEffectVolume.progress = Settings.instance.sfxVolume;

        this.btnClose = this.node.getChildByName('BtnClose').getComponent(Button);
        if(this.btnClose) {
            this.btnClose.node.on('click', this.onCloseClick, this);
        }

       
    }

    update(deltaTime: number) {
        
    }

    onBgmVolumeChange(value:Slider) {
        console.log('onBgmVolumeChange:', value.progress);
        Settings.instance.bgmVolume = math.clamp01(value.progress);
        this.progressbarBgmVolume.progress = value.progress;
        // 存盘
    }

    onEffectVolumeChange(value:Slider) {
        Settings.instance.sfxVolume = math.clamp01(value.progress);
        this.progressbarEffectVolume.progress = value.progress;
    }

    onCloseClick() {
        UIManager.instance.closePanel(this.node.name, false);
    }
}


