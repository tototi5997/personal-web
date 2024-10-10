import { Mesh, MeshLambertMaterial, SphereGeometry, CircleGeometry, MeshBasicMaterial, DoubleSide, Group, TextureLoader } from "three";
import EarthBg from "@/assets/earth.jpg";

export class Planet {
  private earth: Mesh;
  private earthImg: HTMLImageElement;
  // private earthImgData: ImageData | undefined;
  private earthGrow: Mesh | Group;

  constructor() {
    const textureLoader = new TextureLoader();
    const earthTexture = textureLoader.load(EarthBg);
    const earthGeometry = new SphereGeometry(15, 32, 32);
    const meshBasic = new MeshLambertMaterial({
      color: 0x624bc8, // 地球颜色,
      map: earthTexture,
    });

    this.earth = new Mesh(earthGeometry, meshBasic);
    this.earthImg = document.createElement("img");
    this.earthImg.src = EarthBg;
    this.earthImg.onload = () => {
      const earthCanvas = document.createElement("canvas");
      const earthCtx = earthCanvas.getContext("2d") as CanvasRenderingContext2D;
      earthCanvas.width = this.earthImg.width;
      earthCanvas.height = this.earthImg.height;
      earthCtx?.drawImage(this.earthImg, 0, 0, this.earthImg.width, this.earthImg.height);
      // this.earthImgData = earthCtx.getImageData(0, 0, this.earthImg.width, this.earthImg.height);
    };

    // 地球光晕
    const geometry = new CircleGeometry(15 + 1.5, 15);
    const material = new MeshBasicMaterial({ color: 0x624bc8, side: DoubleSide });
    const material2 = new MeshBasicMaterial({ color: 0xd1bdff, side: DoubleSide });
    const circle = new Mesh(geometry, material);
    const circle2 = new Mesh(geometry, material2);
    this.earthGrow = new Group();
    circle.layers.set(1);
    circle2.layers.set(1);
    this.earthGrow.add(circle);
    this.earthGrow.add(circle2);
  }

  getEarth() {
    return this.earth;
  }

  getEarthGrow() {
    return this.earthGrow;
  }
}
