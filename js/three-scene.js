document.addEventListener('DOMContentLoaded', () => {
    const init3DElement = () => {
        const container = document.getElementById('hero-3d-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Core Group to hold the nested shapes
        const coreGroup = new THREE.Group();
        scene.add(coreGroup);

        // --- SHAPE 1: The "Curly" Knot ---
        const geometry1 = new THREE.TorusKnotGeometry(4.95, 1.54, 250, 50, 3, 4);
        const orangeMetallic = new THREE.MeshPhysicalMaterial({
            color: 0xff8c00,
            emissive: 0x442200,
            metalness: 1.0,
            roughness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            side: THREE.FrontSide
        });
        const shape1 = new THREE.Mesh(geometry1, orangeMetallic);
        coreGroup.add(shape1);

        // --- SHAPE 2: The "Hexagonal" Outer Cage ---
        // Using Icosahedron with 0 detail produces a large faceted geometric shape
        // Radius 11 ensures it NEVER touches shape1 (which is approx radius 6.5)
        const geometry2 = new THREE.IcosahedronGeometry(11, 0);
        const mossMetallic = new THREE.MeshPhysicalMaterial({
            color: 0x5d7a67,
            metalness: 0.8,
            roughness: 0.2,
            wireframe: true,
            transparent: true,
            opacity: 0.6,
            emissive: 0x112211,
            emissiveIntensity: 0.7
        });
        const shape2 = new THREE.Mesh(geometry2, mossMetallic);
        coreGroup.add(shape2);

        // Add a subtle inner wireframe to shape1
        const shape1WireMat = new THREE.MeshBasicMaterial({
            color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1
        });
        const shape1Wire = new THREE.Mesh(geometry1, shape1WireMat);
        shape1.add(shape1Wire);

        // Responsive Spacing: Keep it centered but adjust camera
        const updateLayout = () => {
            const isMobile = window.innerWidth < 680;
            if (isMobile) {
                coreGroup.position.set(0, 0, 0);
                camera.position.z = 29; // Closer for bigger feel on mobile
            } else {
                coreGroup.position.set(0, 0, 0);
                camera.position.z = 24;
            }
        };
        updateLayout();

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 150;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 60;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.12, color: 0xffffff, transparent: true, opacity: 0.4
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const p1 = new THREE.PointLight(0xffffff, 2.5, 120);
        p1.position.set(20, 20, 20);
        scene.add(p1);
        const p2 = new THREE.PointLight(0x5d7a67, 3.5, 100);
        p2.position.set(-20, -20, 10);
        scene.add(p2);

        // Interaction
        let mouseX = 0, mouseY = 0;
        const halfX = window.innerWidth / 2;
        const halfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - halfX);
            mouseY = (e.clientY - halfY);
        });

        const animate = () => {
            requestAnimationFrame(animate);

            // Different rotation speeds for internal/external
            shape1.rotation.x += 0.003;
            shape1.rotation.y += 0.005;

            shape2.rotation.y -= 0.002;
            shape2.rotation.z += 0.001;

            particlesMesh.rotation.y += 0.0005;

            // Follow mouse with subtle tilt
            const targetX = mouseX * 0.001;
            const targetY = mouseY * 0.001;
            coreGroup.rotation.x += 0.05 * (targetY - coreGroup.rotation.x);
            coreGroup.rotation.y += 0.05 * (targetX - coreGroup.rotation.y);

            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            updateLayout();
        });
    };
    init3DElement();
});
