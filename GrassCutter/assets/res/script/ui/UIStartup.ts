import { _decorator, Component, Node, Button,log, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIStartup')
export class UIStartup extends Component {
    start() {
        let btnClick = this.node.getChildByName("Button");
        if (btnClick) {
            btnClick.on(Button.EventType.CLICK, this.onBtnStartupClicked, this);
            console.log("Button listener added successfully");
        } else {
            console.error("Button not found");
        }
        console.log("UIStartup component started");
    }

    update(deltaTime: number) {
        
    }

    onBtnStartupClicked() {
        console.log("Button clicked");
        director.loadScene("game");
    }
}


