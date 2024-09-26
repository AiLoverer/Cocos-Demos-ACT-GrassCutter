import { _decorator, Component, Node , CCFloat, input, Input, EventTouch, Vec3, math,UITransform} from 'cc';
import { VirtualInput } from './input/VirtualInput';
const { ccclass, property } = _decorator;

@ccclass('UIJoyStick')
export class UIJoyStick extends Component {
    @property(Node)
    stickBg: Node | null = null;

    @property(Node)
    thumbnail: Node | null = null;

    @property({type:CCFloat})
    radius: number = 130;

    private _parentHeight: number = 0;
    /**
     * 摇杆初始化的位置
     */
    initJoyStickBgPosition: Vec3 = new Vec3();

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        this.initJoyStickBgPosition = this.stickBg.worldPosition.clone();

        // 获取父节点的高度
        if (this.stickBg && this.stickBg.parent) {
            const parentUITransform = this.stickBg.parent.getComponent(UITransform);
            if (parentUITransform) {
                this._parentHeight = parentUITransform.height;
                console.log(`parentHeight: ${this._parentHeight}`);
            } else {
                console.error('父节点没有 UITransform 组件');
            }
        } else {
            console.error('stickBg 或其父节点不存在');
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    update(deltaTime: number) {
        
    }

    onTouchStart(eventTouch : EventTouch) {
        const touchLocation = eventTouch.getUILocation();
        if (this._parentHeight > 0 && touchLocation.y > this._parentHeight ) {
            console.log('触摸位置超出父节点高度');
            return;
        }

        console.log(`x : ${touchLocation.x}`);
        this.stickBg.setWorldPosition(touchLocation.x, touchLocation.y, 0);
    }

    onTouchMove(eventTouch : EventTouch) {
        let touchLocation = eventTouch.getUILocation();

        let worldPosition = new Vec3(touchLocation.x, touchLocation.y, 0);
        let localPosition = new Vec3(0, 0, 0);

        // 转化摇杆的位置到背景图的本地坐标
        this.stickBg.inverseTransformPoint(localPosition, worldPosition);
        let thumbnailPosition = new Vec3();
        let length = localPosition.length();
        localPosition.normalize();
        Vec3.scaleAndAdd(thumbnailPosition, new Vec3(), localPosition, math.clamp(length, 0, this.radius));
        
        this.thumbnail.setPosition(thumbnailPosition);

        VirtualInput.setHorizontal(thumbnailPosition.x / this.radius);
        VirtualInput.setVertical(thumbnailPosition.y / this.radius);
    }

    onTouchEnd() {
        this.thumbnail.setPosition(Vec3.ZERO);
        this.stickBg.worldPosition = this.initJoyStickBgPosition;
        VirtualInput.setHorizontal(0);
        VirtualInput.setVertical(0);
    }
}


