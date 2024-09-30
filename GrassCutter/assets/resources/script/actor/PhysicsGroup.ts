import { PhysicsSystem, _decorator } from 'cc';

/**
 * 物理分组定义
 */
export class PhysicsGroup {

    static readonly Default = PhysicsSystem.PhysicsGroup.DEFAULT;

    static readonly Player = 1 << 1;

    static readonly Enemy = 1 << 2;

    static readonly PlayerProjectTile = 1 << 3;

    static readonly EnemyProjectTile = 1 << 4;

    static isHurtable(srcGroup: number, destGroup: number): boolean {

        if (srcGroup == this.Enemy) {
            return destGroup == this.Player;
        }

        if (srcGroup == this.PlayerProjectTile) {
            return destGroup == this.Enemy;
        }

        if (srcGroup == this.EnemyProjectTile) {
            return destGroup == this.Player;
        }

        return false;
    }
}


