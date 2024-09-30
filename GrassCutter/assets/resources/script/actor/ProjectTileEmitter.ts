import { _decorator, Component, director, instantiate, Node, Pool, Prefab } from 'cc';
import { Events } from '../events/Events';
import { ProjectTile } from './ProjectTile';
const { ccclass, property } = _decorator;

/**
 * 投射物发射器
 */
@ccclass('ProjectTileEmitter')
export class ProjectTileEmitter extends Component {

   /**
     * 投射物预制体
     */
   @property(Prefab)
   projectile: Prefab | null = null;

   /**
    * 投射物内存池
    */
   prefabPool: Pool<Node> | null = null;

   start() {
       const poolCount = 5;

       this.prefabPool = new Pool(() => {
           return instantiate(this.projectile!);
       }, poolCount, (node: Node) => {
           node.removeFromParent();
       });
   }

   onDestroy() {
       this.prefabPool.destroy();
   }

   create(): ProjectTile {
       console.log('>>>>>>>>',this.node.name);
       let node = this.prefabPool.alloc();
       if (node.parent == null)
           director.getScene().addChild(node);
       node.active = true;
       node.once(Events.onProjectileDead, this.onProjectileDead, this);
       let projectile = node.getComponent(ProjectTile);
       return projectile;
   }

   onProjectileDead(projectile: ProjectTile) {
       projectile.node.active = false;
       this.prefabPool.free(projectile.node);
   }
}


