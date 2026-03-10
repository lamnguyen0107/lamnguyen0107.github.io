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

        // Create a 3D Geometry (Icosahedron looks premium and tech-focused)
        const geometry = new THREE.IcosahedronGeometry(12, 1); // Radius 12, Detail 1

        // Solid glass material matching the brand Orange
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xff8c00, // Orange accent
            metalness: 0.1,
            roughness: 0.2,
            transmission: 0.9, // glass like
            transparent: true,
            opacity: 0.8,
            wireframe: true, // Wireframe gives a cool structural look
        });

        const shape = new THREE.Mesh(geometry, glassMaterial);
        scene.add(shape);

        // Adding ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Adding colored directional lights for reflections
        const pointLight = new THREE.PointLight(0xff8c00, 2, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x5d7a67, 2, 100); // Moss Green light
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);

        camera.position.z = 30;

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

            // Constant base rotation
            shape.rotation.x += 0.005;
            shape.rotation.y += 0.01;

            // Interactive rotation smoothing
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            shape.rotation.x += 0.05 * (targetY - shape.rotation.x);
            shape.rotation.y += 0.05 * (targetX - shape.rotation.y);

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
