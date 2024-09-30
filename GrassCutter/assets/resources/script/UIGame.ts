import { _decorator, Button, Component, director, Label, Node, ProgressBar, resources } from 'cc';
import { DialogDef, UIManager } from './UIManager';
import { UIImageLabel } from './UIImageLabel';
import { ActorManager } from './level/ActorManager';
import { Events } from './events/Events';
import { ActorProperty } from './actor/ActorProperty';
const { ccclass, property } = _decorator;
/**
 * 游戏主界面
 */
@ccclass('UIGame')
export class UIGame extends Component {

    @property(ProgressBar)
    expBar: ProgressBar | null = null;

    @property(UIImageLabel)
    expLabel: UIImageLabel | null = null;

    @property(ProgressBar)
    hpBar: ProgressBar | null = null;

    isPaused: boolean = false;

    labelPause: Label | null = null;

    btnSetting: Button | null = null;

    start() {
        let player = ActorManager.instance.playerActor;
        player.node.on(Events.onExpGain, this.onExpGain, this);
        player.node.on(Events.onPlayerUpgrade, this.onUpgrade, this);
        player.node.on(Events.onHurt, this.onHurt, this);

        this.onExpGain();
    }

    onDestroy() {
        let player = ActorManager.instance.playerActor;
        player.node.off(Events.onExpGain, this.onExpGain, this);
        player.node.off(Events.onPlayerUpgrade, this.onUpgrade, this);
        player.node.off(Events.onHurt, this.onHurt, this);
    }

    onExitGame() {
        //resources.releaseUnusedAssets()
        director.loadScene("startup")
    }

    onPauseGame() {
        if (director.isPaused()) {
            director.resume();
        } else {
            director.pause();
        }
    }

    onOpenSetting() {
        UIManager.instance.showDialog(DialogDef.UISetting);
    }

    onUpgrade() {
        UIManager.instance.showDialog(DialogDef.UISkillUpgrade);
    }

    onExpGain() {
        if (ActorManager.instance.playerActor) {
            let actorProperty = ActorManager.instance.playerActor.actorProperty;
            this.expBar!.progress = actorProperty.exp / actorProperty.maxExp;
            this.expLabel!.string = actorProperty.exp.toFixed() + "/" + actorProperty.maxExp.toFixed();
        }
    }

    onHurt(actorProperty: ActorProperty) {
        this.hpBar.progress = actorProperty.hpPercent;
    }
}

