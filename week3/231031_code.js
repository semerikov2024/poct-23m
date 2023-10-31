import * as THREE from 'three';
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

		var loader = new THREE.TextureLoader();
		const pumpkin = loader.load("../assets/pumpkin.jpg");
		const helloween = loader.load("../assets/helloween.jpg");
		const cap = loader.load("../assets/cap.png");

		const geometry1 = new THREE.PlaneGeometry(1, 1);
		const material1 = new THREE.MeshBasicMaterial( {color: 0x00ffff, transparent: true, opacity: 0.5, map: pumpkin} );
		const plane = new THREE.Mesh( geometry1, material1 );
		plane.position.set(0, 0, 0);

		const geometry2 = new THREE.BoxGeometry( 1, 1, 1 ); 

		const edges = [
			new THREE.MeshBasicMaterial({map: loader.load("https://live.staticflickr.com/854/42936929215_efa87c8a9a_b.jpg")}),
			new THREE.MeshBasicMaterial({map: loader.load("https://live.staticflickr.com/514/18832759790_bed1aeece8_b.jpg")}),
			new THREE.MeshBasicMaterial({map: loader.load("https://live.staticflickr.com/6140/5934453114_3675350a78_b.jpg")}),
			new THREE.MeshBasicMaterial({map: loader.load("https://live.staticflickr.com/2342/2269094999_6ac65c0947.jpg")}),
			new THREE.MeshBasicMaterial({map: loader.load("https://live.staticflickr.com/1757/41821018565_614db58ddc_b.jpg")}),
			new THREE.MeshBasicMaterial({map: loader.load("https://live.staticflickr.com/3103/2420240470_bc0bb7a260.jpg")})
		]

		//const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00, map: cap} ); 
		const cube = new THREE.Mesh( geometry2, edges ); 
		cube.position.set(-1.5, 0, 0);

		const geometry3 = new THREE.SphereGeometry( 0.5, 32, 16 ); 
		const material3 = new THREE.MeshBasicMaterial( { color: 0xffff00, map: helloween } ); 
		const sphere = new THREE.Mesh( geometry3, material3 );
		//sphere.position.set(+1.5, 0, 0);

		const anchor_drugs = mindarThree.addAnchor(0);
		anchor_drugs.group.add(plane);
		anchor_drugs.group.add(cube);

		const anchor_cap = mindarThree.addAnchor(1);
		anchor_cap.group.add(sphere);

		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			  cube.rotation.x += Math.PI/180;
			  cube.rotation.y += 2*Math.PI/180;
			  renderer.render(scene, camera);
		});
	}
	start();
});
