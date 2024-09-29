import { _decorator, Component, Node, Layout, Prefab, Pool, resources, SpriteFrame, instantiate, Sprite } from 'cc';
import { ActorManager } from './level/ActorManager';
import { UIImageLabel } from './UIImageLabel';
import { Events } from './events/Events';

const { ccclass, property, requireComponent } = _decorator;
/**
 * 玩家等级
 */
@ccclass('UIPlayerLevel')
@requireComponent(UIImageLabel)
export class UIPlayerLevel extends Component {
    
    level: UIImageLabel;

    start() {
        this.level = this.node.getComponent(UIImageLabel);

        let player = ActorManager.instance.playerActor;
        player.node.on(Events.onPlayerUpgrade, this.onPlayerUpgrade, this);
        this.level.string = player.actorProperty.level.toString();
    }

    onPlayerUpgrade() {
        this.level.string = ActorManager.instance.playerActor.actorProperty.level.toString();
    }

}


