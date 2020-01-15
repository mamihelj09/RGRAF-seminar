// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import ship_hero from './assets/ship_good.glb';
import ship_enemy from './assets/ship_bad.glb';
import ship_boss from './assets/ship_boss.glb';

export function modelLoader() {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    let heroModel;
    loader.load(ship_hero, (gltf) => {
      heroModel = gltf.scene.children[0]
      let enemyModel;
      loader.load(ship_enemy, (gltf2) => {
        enemyModel = gltf2.scene.children[0];
        let bossModel;
        loader.load(ship_boss, (gltf3) => {
          bossModel = gltf3.scene.children[0];
          resolve({heroModel, enemyModel, bossModel, });
        }, (xhr) => console.log(`Boss model loaded: ${(xhr.loaded/ xhr.total) * 100}`),
        (e) => reject(e));
      }, (xhr) => console.log(`Enemy model loaded: ${(xhr.loaded/ xhr.total) * 100}%`),
      (e) => reject(e));
    }, (xhr) => console.log(`Hero model loaded: ${(xhr.loaded/ xhr.total) * 100}%`),
    (e) => reject(e));
  });
}
