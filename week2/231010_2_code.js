import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';


document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.querySelector("#my-ar-container"),
			imageTargetSrc: "kvadevit.mind",
			uiScanning: "yes",
			uiLoading: "yes",
		      });
		const {renderer, scene, camera} = mindarThree;

		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial( {color: 0x00ffff, transparent: true, opacity: 0.5} );
		const plane = new THREE.Mesh( geometry, material );

		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(plane);

		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			  renderer.render(scene, camera);
		});
	}
	start();
});
