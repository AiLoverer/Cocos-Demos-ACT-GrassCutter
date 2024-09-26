import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 投射物属性
 */

@ccclass('ProjectTileProperty')
export class ProjectTileProperty  {
    /**
     * 穿透
     */
    penetration: number = 1;

    /**
     * 时长
     */
    liftTime: number = 3.0;

    /**
     * 追踪
     */
    chase: boolean = false;
}


