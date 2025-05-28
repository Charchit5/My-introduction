function goToPage(id) {
    document.querySelectorAll('.page').forEach(element => element.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function createScene(canvasId, texturePath, lightColor) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId), alpha: true });
    renderer.setSize(300, 300);
    const loader = new THREE.TextureLoader();
    loader.load(`textures/${texturePath}`, texture => {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material =  new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.3,
            metalness: 0.4
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        const light = new THREE.PointLight(lightColor, 2, 100);
        light.position.set(2, 2, 2);
        scene.add(light);
        camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01;
        sphere.rotation.x += 0.005;
        renderer.render(scene, camera);
    }

        animate();
    });
}

window.onload = () => {
    goToPage('welcome');
    createScene('studyCanvas', 'ice.jpg', 0x88ccff);
    createScene('hobbyCanvas', 'fire.jpg', 0xff4400);
}
