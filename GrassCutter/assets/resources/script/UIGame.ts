import { _decorator, Component, director, Node, resources } from 'cc';
import { DialogDef, UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('UIGame')
export class UIGame extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onGameExit() {
        console.log("onGameExit ...");
        director.loadScene("startup");
    }

    onGameSetting(){
        console.log("onGameSetting ...");
        UIManager.instance.showDialog(DialogDef.UISettings);
    }

    onGamePause(){
        if(director.isPaused()){
            director.resume();
            return;
        }
        director.pause();
    }
}


