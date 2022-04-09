    // Creating scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 30000); //(field of view/aspect ratio/near/far)
    const renderer = new THREE.WebGLRenderer({
    });
    renderer.setClearColor(0x000000, 0);//Sets the clear color and opacity.

    // To allow the camera to orbit around a target
    const controlCamera = new THREE.OrbitControls(camera, renderer.domElement);
    controlCamera.update();
    controlCamera.enableDamping = true;//Set to true to enable damping (inertia), which can be used to give a sense of weight to the controls. 
    controlCamera.minDistance =700;//How far you can dolly in ( PerspectiveCamera only ). Default is 0.
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 1)); //globally illuminates
    scene.add(new THREE.PointLight(0xffffff, 1));//from a single point in all directions
    scene.add(new THREE.HemisphereLight(0xffffff, 0.1));//above the scene
    let model;

    const loader = new THREE.GLTFLoader();// Loading 3D model
    const clock = new THREE.Clock();//keeping track of time?
   

    // Floor
    const geometry = new THREE.BoxGeometry(2000, 0, 2000);
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/concrete.jpeg')
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Loading 3D model
    loader.load('a_happy_worker/scene.gltf', function (gltf) {
        model = gltf.scene;
        model.position.y+=5;

    // Animation  // Animation of walking 
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
        window.addEventListener('keypress', (event) => {
            switch (event.code) {
                case 'KeyA':
                    model.position.z += 10;
                    animate();
                    break;
                case 'KeyZ':
                    model.position.x += 10;
                    animate();
                    break;
                case 'KeyS':
                    model.position.z -= 10;
                    animate();
                    break;
                case 'KeyW':
                    model.position.x -= 10;
                    animate();
                    break;
                case 'KeyQ':
                    model.position.z += 10;
                    model.position.x += 10;
                    animate();
                    break;
                case 'KeyE':
                    model.position.z += 10;
                    model.position.x -= 10;
                    animate();
                    break;
                case 'KeyX':
                    model.position.z -= 10;
                    model.position.x += 10;
                    animate();
                    break;
                case 'KeyC':
                    model.position.z -= 10;
                    model.position.x -= 10;
                    animate();
                    break;
                case 'KeyR':
                    model.rotation.y += 0.1;
                    animate();
                    break;
                case 'KeyT':
                    model.rotation.y -= 0.1;
                    animate();
                    break;
                default:
                    break;
            }
        })
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });


    function animate() {
        
        requestAnimationFrame(animate);
        controlCamera.update();
       
        var delta = clock.getDelta();
	
	if ( mixer ) mixer.update( delta );
        renderer.render(scene, camera);
    }
    animate();

    