/**
 * 3D Model Viewer with GLTF/GLB Support
 * Supports both loading external 3D models and procedural generation
 */

class YogaPoseViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId) || document.body;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModel = null;
        this.loader = null;
        
        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 10, 50);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(3, 3, 8);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 20;

        // Lighting
        this.setupLights();

        // Ground
        this.createGround();

        // GLTF Loader
        this.loader = new THREE.GLTFLoader();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation
        this.animate();
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        mainLight.shadow.camera.near = 0.1;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -10;
        mainLight.shadow.camera.right = 10;
        mainLight.shadow.camera.top = 10;
        mainLight.shadow.camera.bottom = -10;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // Fill lights
        const fillLight1 = new THREE.PointLight(0x667eea, 0.5);
        fillLight1.position.set(-5, 5, -5);
        this.scene.add(fillLight1);

        const fillLight2 = new THREE.PointLight(0x764ba2, 0.4);
        fillLight2.position.set(0, 5, -8);
        this.scene.add(fillLight2);
    }

    createGround() {
        // Yoga mat
        const matGeometry = new THREE.BoxGeometry(2, 0.05, 3);
        const matMaterial = new THREE.MeshStandardMaterial({ color: 0x9c27b0 });
        const mat = new THREE.Mesh(matGeometry, matMaterial);
        mat.position.y = -1.3;
        mat.receiveShadow = true;
        this.scene.add(mat);

        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x0f3460,
            roughness: 0.9,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.35;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grid
        const gridHelper = new THREE.GridHelper(20, 20, 0x667eea, 0x2a2a4e);
        gridHelper.position.y = -1.3;
        this.scene.add(gridHelper);
    }

    /**
     * Load a 3D model from a file
     * @param {string} modelPath - Path to the .glb or .gltf file
     * @param {function} onProgress - Progress callback
     */
    loadModel(modelPath, onProgress) {
        return new Promise((resolve, reject) => {
            // Remove existing model
            if (this.currentModel) {
                this.scene.remove(this.currentModel);
                this.currentModel = null;
            }

            this.loader.load(
                modelPath,
                (gltf) => {
                    this.currentModel = gltf.scene;
                    
                    // Enable shadows
                    this.currentModel.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    // Center the model
                    const box = new THREE.Box3().setFromObject(this.currentModel);
                    const center = box.getCenter(new THREE.Vector3());
                    this.currentModel.position.sub(center);

                    // Scale appropriately
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 2 / maxDim;
                    this.currentModel.scale.multiplyScalar(scale);

                    this.scene.add(this.currentModel);
                    resolve(this.currentModel);
                },
                (xhr) => {
                    if (onProgress) {
                        const percentComplete = (xhr.loaded / xhr.total) * 100;
                        onProgress(percentComplete);
                    }
                },
                (error) => {
                    console.error('Error loading model:', error);
                    reject(error);
                }
            );
        });
    }

    /**
     * Create procedural human figure for a specific pose
     * @param {string} poseName - Name of the yoga pose
     * @param {string} difficulty - Difficulty level
     */
    createProceduralPose(poseName, difficulty) {
        // Remove existing model
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
            this.currentModel = null;
        }

        const colors = {
            Beginner: 0x4caf50,
            Intermediate: 0xff9800,
            Advanced: 0xf44336,
        };

        const color = colors[difficulty] || 0x4caf50;
        const human = this.createDetailedHuman(color);

        // Apply pose-specific transformations
        this.applyPose(human, poseName);

        this.currentModel = human;
        this.scene.add(human);
    }

    createDetailedHuman(color) {
        const human = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.2,
            roughness: 0.7,
        });

        // Head
        const head = this.createBodyPart('sphere', 0.35, material);
        head.position.y = 2.2;
        human.add(head);

        // Neck
        const neck = this.createBodyPart('cylinder', [0.12, 0.15, 0.3], material);
        neck.position.y = 1.85;
        human.add(neck);

        // Torso
        const torso = this.createBodyPart('box', [0.9, 1.3, 0.45], material);
        torso.position.y = 1.0;
        human.add(torso);

        // Arms (with joints)
        const leftUpperArm = this.createBodyPart('capsule', [0.11, 0.65], material);
        leftUpperArm.position.set(-0.55, 1.4, 0);
        leftUpperArm.rotation.z = Math.PI / 6;
        leftUpperArm.name = 'leftUpperArm';
        human.add(leftUpperArm);

        const leftLowerArm = this.createBodyPart('capsule', [0.1, 0.6], material);
        leftLowerArm.position.set(-0.9, 0.85, 0);
        leftLowerArm.rotation.z = Math.PI / 4;
        leftLowerArm.name = 'leftLowerArm';
        human.add(leftLowerArm);

        const rightUpperArm = this.createBodyPart('capsule', [0.11, 0.65], material);
        rightUpperArm.position.set(0.55, 1.4, 0);
        rightUpperArm.rotation.z = -Math.PI / 6;
        rightUpperArm.name = 'rightUpperArm';
        human.add(rightUpperArm);

        const rightLowerArm = this.createBodyPart('capsule', [0.1, 0.6], material);
        rightLowerArm.position.set(0.9, 0.85, 0);
        rightLowerArm.rotation.z = -Math.PI / 4;
        rightLowerArm.name = 'rightLowerArm';
        human.add(rightLowerArm);

        // Legs (with joints)
        const leftUpperLeg = this.createBodyPart('capsule', [0.13, 0.75], material);
        leftUpperLeg.position.set(-0.25, 0.05, 0);
        leftUpperLeg.name = 'leftUpperLeg';
        human.add(leftUpperLeg);

        const leftLowerLeg = this.createBodyPart('capsule', [0.11, 0.7], material);
        leftLowerLeg.position.set(-0.25, -0.65, 0);
        leftLowerLeg.name = 'leftLowerLeg';
        human.add(leftLowerLeg);

        const rightUpperLeg = this.createBodyPart('capsule', [0.13, 0.75], material);
        rightUpperLeg.position.set(0.25, 0.05, 0);
        rightUpperLeg.name = 'rightUpperLeg';
        human.add(rightUpperLeg);

        const rightLowerLeg = this.createBodyPart('capsule', [0.11, 0.7], material);
        rightLowerLeg.position.set(0.25, -0.65, 0);
        rightLowerLeg.name = 'rightLowerLeg';
        human.add(rightLowerLeg);

        // Hands
        const leftHand = this.createBodyPart('sphere', 0.12, material);
        leftHand.position.set(-1.15, 0.5, 0);
        human.add(leftHand);

        const rightHand = this.createBodyPart('sphere', 0.12, material);
        rightHand.position.set(1.15, 0.5, 0);
        human.add(rightHand);

        // Feet
        const leftFoot = this.createBodyPart('box', [0.15, 0.08, 0.3], material);
        leftFoot.position.set(-0.25, -1.05, 0.1);
        human.add(leftFoot);

        const rightFoot = this.createBodyPart('box', [0.15, 0.08, 0.3], material);
        rightFoot.position.set(0.25, -1.05, 0.1);
        human.add(rightFoot);

        return human;
    }

    createBodyPart(type, size, material) {
        let geometry;
        if (type === 'sphere') {
            geometry = new THREE.SphereGeometry(size, 32, 32);
        } else if (type === 'cylinder') {
            geometry = new THREE.CylinderGeometry(size[0], size[1], size[2], 32);
        } else if (type === 'box') {
            geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
        } else if (type === 'capsule') {
            geometry = new THREE.CapsuleGeometry(size[0], size[1], 8, 16);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    }

    applyPose(human, poseName) {
        const poses = {
            'Tadasana': () => {
                // Mountain Pose - default standing
            },
            'Vrikshasana': () => {
                // Tree Pose
                const leftUpperLeg = human.getObjectByName('leftUpperLeg');
                const leftLowerLeg = human.getObjectByName('leftLowerLeg');
                if (leftUpperLeg) {
                    leftUpperLeg.rotation.z = Math.PI / 3;
                    leftUpperLeg.rotation.x = Math.PI / 6;
                    leftUpperLeg.position.x = -0.4;
                }
                if (leftLowerLeg) {
                    leftLowerLeg.rotation.z = Math.PI / 2.5;
                    leftLowerLeg.position.set(-0.6, 0.2, 0);
                }
                // Arms up
                const leftUpperArm = human.getObjectByName('leftUpperArm');
                const rightUpperArm = human.getObjectByName('rightUpperArm');
                if (leftUpperArm) {
                    leftUpperArm.rotation.z = Math.PI / 2.5;
                    leftUpperArm.position.y = 2.0;
                }
                if (rightUpperArm) {
                    rightUpperArm.rotation.z = -Math.PI / 2.5;
                    rightUpperArm.position.y = 2.0;
                }
            },
            'Adho Mukha Svanasana': () => {
                // Downward Dog
                human.rotation.x = Math.PI / 3.5;
                human.position.y = 0.3;
                const leftUpperArm = human.getObjectByName('leftUpperArm');
                const rightUpperArm = human.getObjectByName('rightUpperArm');
                if (leftUpperArm) leftUpperArm.rotation.z = Math.PI / 2;
                if (rightUpperArm) rightUpperArm.rotation.z = -Math.PI / 2;
            },
            'Balasana': () => {
                // Child's Pose
                human.rotation.x = Math.PI / 1.8;
                human.position.y = -0.3;
                human.scale.set(0.9, 0.9, 0.9);
            },
            'Virabhadrasana II': () => {
                // Warrior II
                const leftUpperArm = human.getObjectByName('leftUpperArm');
                const rightUpperArm = human.getObjectByName('rightUpperArm');
                const leftLowerArm = human.getObjectByName('leftLowerArm');
                const rightLowerArm = human.getObjectByName('rightLowerArm');
                
                if (leftUpperArm) {
                    leftUpperArm.rotation.z = Math.PI / 2;
                    leftUpperArm.position.set(-0.8, 1.4, 0);
                }
                if (leftLowerArm) {
                    leftLowerArm.rotation.z = Math.PI / 2;
                    leftLowerArm.position.set(-1.4, 1.4, 0);
                }
                if (rightUpperArm) {
                    rightUpperArm.rotation.z = -Math.PI / 2;
                    rightUpperArm.position.set(0.8, 1.4, 0);
                }
                if (rightLowerArm) {
                    rightLowerArm.rotation.z = -Math.PI / 2;
                    rightLowerArm.position.set(1.4, 1.4, 0);
                }

                const leftUpperLeg = human.getObjectByName('leftUpperLeg');
                if (leftUpperLeg) {
                    leftUpperLeg.rotation.z = Math.PI / 8;
                }
            },
            'Trikonasana': () => {
                // Triangle Pose
                human.rotation.z = Math.PI / 6;
                const rightUpperArm = human.getObjectByName('rightUpperArm');
                const leftUpperArm = human.getObjectByName('leftUpperArm');
                if (rightUpperArm) {
                    rightUpperArm.rotation.z = -Math.PI / 1.5;
                    rightUpperArm.position.y = 2.2;
                }
                if (leftUpperArm) {
                    leftUpperArm.rotation.z = Math.PI / 3;
                    leftUpperArm.position.y = 0.5;
                }
            },
            'Bhujangasana': () => {
                // Cobra Pose
                human.rotation.x = -Math.PI / 6;
                human.position.y = -0.5;
                const leftUpperArm = human.getObjectByName('leftUpperArm');
                const rightUpperArm = human.getObjectByName('rightUpperArm');
                if (leftUpperArm) leftUpperArm.rotation.z = Math.PI / 4;
                if (rightUpperArm) rightUpperArm.rotation.z = -Math.PI / 4;
            },
            'Sirsasana': () => {
                // Headstand
                human.rotation.x = Math.PI;
                human.position.y = 1.5;
                const leftUpperArm = human.getObjectByName('leftUpperArm');
                const rightUpperArm = human.getObjectByName('rightUpperArm');
                if (leftUpperArm) leftUpperArm.rotation.z = Math.PI / 3;
                if (rightUpperArm) rightUpperArm.rotation.z = -Math.PI / 3;
            },
        };

        const poseFunction = poses[poseName];
        if (poseFunction) {
            poseFunction();
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        
        if (this.currentModel) {
            this.currentModel.rotation.y += 0.003;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Make available globally
window.YogaPoseViewer = YogaPoseViewer;
