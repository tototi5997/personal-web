import { Object3D, Vector3 } from "three";

export class DirectionController {
  private keys: { forward: boolean; backward: boolean; left: boolean; right: boolean }; // 键盘状态
  private turnSpeed: number; // 转弯速度
  private moveSpeed: number; // 移动速度

  constructor() {
    this.keys = { forward: false, backward: false, left: false, right: false };
    this.turnSpeed = 0.02; // 默认转弯速度
    this.moveSpeed = 0.1; // 默认移动速度

    // 绑定键盘事件
    this.bindEvents();
  }

  private bindEvents(): void {
    document.addEventListener("keydown", (event) => this.onKeyDown(event));
    document.addEventListener("keyup", (event) => this.onKeyUp(event));
  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.keys.forward = true;
        break;
      case "ArrowDown":
      case "KeyS":
        this.keys.backward = true;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.keys.left = true;
        break;
      case "ArrowRight":
      case "KeyD":
        this.keys.right = true;
        break;
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.keys.forward = false;
        break;
      case "ArrowDown":
      case "KeyS":
        this.keys.backward = false;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.keys.left = false;
        break;
      case "ArrowRight":
      case "KeyD":
        this.keys.right = false;
        break;
    }
  }

  // 更新车辆的位置和方向
  public updateCarMovement(car: Object3D): void {
    // 更新车的旋转（左右转弯）
    if (this.keys.left) car.rotation.y += this.turnSpeed;
    if (this.keys.right) car.rotation.y -= this.turnSpeed;

    // 计算车头方向的前进向量（基于rotation.y，x 轴朝向）
    const forwardDirection = new Vector3(Math.cos(car.rotation.y), 0, Math.sin(car.rotation.y));

    // 前进和后退逻辑
    if (this.keys.forward) {
      car.position.add(forwardDirection.multiplyScalar(this.moveSpeed));
    }
    if (this.keys.backward) {
      car.position.add(forwardDirection.multiplyScalar(-this.moveSpeed));
    }
  }
}
