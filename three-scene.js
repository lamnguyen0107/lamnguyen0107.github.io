document.addEventListener('DOMContentLoaded', () => {
    const init3DElement = () => {
        const container = document.getElementById('hero-3d-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create an organic "Metallic Leaf/Forest" abstract geometry
        // We use a TorusKnot for an intricate, elegant flowing shape
        const geometry1 = new THREE.TorusKnotGeometry(8, 2.5, 200, 32, 2, 3);
        const geometry2 = new THREE.TorusKnotGeometry(5, 1.5, 100, 16, 3, 4);

        // Materials matching Brand Colors with a metallic, sophisticated vibe
        const orangeMetallic = new THREE.MeshPhysicalMaterial({
            color: 0xff8c00,
            metalness: 0.8,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: true,
            transparent: true,
            opacity: 0.85
        });

        const mossMetallic = new THREE.MeshPhysicalMaterial({
            color: 0x5d7a67,
            metalness: 0.9,
            roughness: 0.2,
            clearcoat: 1.0,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        const shape1 = new THREE.Mesh(geometry1, orangeMetallic);
        shape1.position.set(2, 2, 0);
        scene.add(shape1);

        const shape2 = new THREE.Mesh(geometry2, mossMetallic);
        shape2.position.set(-5, -4, 5);
        scene.add(shape2);

        // Adding ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        // Adding colored directional lights for specular metallic reflections
        const pointLight1 = new THREE.PointLight(0xffffff, 2, 100);
        pointLight1.position.set(10, 20, 20);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x5d7a67, 3, 100);
        pointLight2.position.set(-20, -10, 10);
        scene.add(pointLight2);
        camera.position.z = 35;

        // Interaction vars
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        const animate = function () {
            requestAnimationFrame(animate);

            // Constant base rotation (Slow and elegant)
            shape1.rotation.x += 0.002;
            shape1.rotation.y += 0.004;
            shape1.rotation.z += 0.001;

            shape2.rotation.x -= 0.003;
            shape2.rotation.y -= 0.005;
            shape2.rotation.z += 0.002;

            // Interactive rotation smoothing
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            shape1.rotation.x += 0.05 * (targetY - shape1.rotation.x);
            shape1.rotation.y += 0.05 * (targetX - shape1.rotation.y);

            shape2.rotation.x += 0.05 * (targetY - shape2.rotation.x);
            shape2.rotation.y += 0.05 * (targetX - shape2.rotation.y);

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    };

    init3DElement();
});
