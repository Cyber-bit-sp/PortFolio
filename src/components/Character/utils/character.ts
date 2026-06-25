import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                if (mesh.material) {
                  const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                  newMat.roughness = 0.35;
                  newMat.metalness = 0.2;

                  if (mesh.name === "BODY.SHIRT" || mesh.name.includes("shirt")) {
                    newMat.color = new THREE.Color("#22d3ee");
                    newMat.emissive = new THREE.Color("#0f766e");
                    newMat.emissiveIntensity = 0.28;
                  } else if (mesh.name === "Pant" || mesh.name.includes("pant") || mesh.name.includes("leg")) {
                    newMat.color = new THREE.Color("#111827");
                    newMat.emissive = new THREE.Color("#1f2937");
                    newMat.emissiveIntensity = 0.08;
                  } else if (mesh.name.includes("face") || mesh.name.includes("skin")) {
                    newMat.color = new THREE.Color("#f8c79f");
                  } else {
                    newMat.color = new THREE.Color("#5eead4");
                    newMat.emissive = new THREE.Color("#14b8a6");
                    newMat.emissiveIntensity = 0.12;
                  }

                  mesh.material = newMat;
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            character.scale.set(1.08, 1.08, 1.08);
            character.position.set(0, -0.6, 0);
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
