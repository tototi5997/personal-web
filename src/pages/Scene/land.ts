import { Group, Mesh, MeshLambertMaterial, PlaneGeometry, RepeatWrapping, TextureLoader } from "three";

export class Land {
  private grassland: Mesh | undefined;
  private landGroup: Group;

  constructor() {
    const geometry = new PlaneGeometry(200, 200);
    const textureLoader = new TextureLoader();

    this.landGroup = new Group();

    textureLoader.load("/src/assets/grassland.jpg", (texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(20, 20);

      const material = new MeshLambertMaterial({ map: texture });
      this.grassland = new Mesh(geometry, material);
      this.grassland.rotation.x = -Math.PI / 2;
      this.landGroup.add(this.grassland);
    });
  }

  getLand() {
    return this.landGroup;
  }
}
