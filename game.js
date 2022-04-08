const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 30000);

const renderer = new THREE.WebGLRenderer({

});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new THREE.GLTFLoader();

loader.load( 'mule_robot/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
