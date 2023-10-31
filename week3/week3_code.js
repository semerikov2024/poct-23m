import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { MindARThree } from 'mindar-image-three';


document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "../assets/drugs_cap.mind",
			uiScanning: "yes",
			uiLoading: "yes",
			maxTrack: 2,
		      });
		const {renderer, scene, camera} = mindarThree;

		const anchor_drugs = mindarThree.addAnchor(0);
		const anchor_cap = mindarThree.addAnchor(1);

		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 5);
		scene.add(light);

		const loader = new GLTFLoader();

		loader.load("../assets/star_trek_-_bird_of_prey_enterprise.glb", (model1) => {
			anchor_drugs.group.add(model1.scene);
			model1.scene.scale.set(0.005, 0.005, 0.005);
			model1.scene.position.set(1.5, 0, 0);
		});

		loader.load("../assets/helloween.glb", (model2) => {
			anchor_cap.group.add(model2.scene);
			model2.scene.scale.set(0.01, 0.01, 0.01);
		});


		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			  renderer.render(scene, camera);
		});
	}
	start();
});
