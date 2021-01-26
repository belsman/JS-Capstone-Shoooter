import Entity from './Entity';

export default class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");
        this.setData("speed", 200);
        this.setData("rotationSpeed", 2);
        this.scale = 0.2;
    }

    thrust() {
        // this.body.velocity.y = -this.getData("speed");
    }

    rotateClockwise() {
        this.angle += this.getData("rotationSpeed");
    }

    rotateAntiClockwise() {
        this.angle -= this.getData("rotationSpeed");
    }

    update() {

    }
}
