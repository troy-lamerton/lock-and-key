// this is the file containing the whole visualisation
//kk
var scene, camera, renderer;
var lockModel, keyModel;

var loader = new THREE.JSONLoader();

init();
animate();

function addLockToScene ( geometry ) {
  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, -70, 100 ).normalize();

  scene.add( directionalLight );

  var material = new THREE.MeshLambertMaterial( { color: 0xf9dd4f } );

  lockModel = new THREE.Mesh(geometry, material);
  lockModel.rotateY(Math.PI*1.1)
  // lockModel.rotate
  lockModel.rotateX(Math.PI*0.55)
  scene.add(lockModel);
  renderer.render( scene, camera );
}

function addKeyToScene ( geometry ) {

  var material = new THREE.MeshLambertMaterial( { color: 0xc5cbcc } );

  keyModel = new THREE.Mesh(geometry, material);
  keyModel.geometry.center()
  keyModel.position.x += 8
  keyModel.rotateX(Math.PI*0.55)
  keyModel.rotateZ(-Math.PI/2)
  scene.add(keyModel);

  renderer.render( scene, camera );
  document.addEventListener('mousemove', onMouseMove, false);
}
var mouse = {x: -1, y: -1}
function onMouseMove (event) {

  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
  keyModel.position.copy(pos)
}

function init() {
 
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 14;
  camera.position.x = 3;
 
  loader.load( "../models/Lock.json", addLockToScene );
  loader.load( "../models/Key.json", addKeyToScene );
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
 
  document.body.appendChild( renderer.domElement );
  
}


function animate() {
 
  requestAnimationFrame( animate );

  if (lockModel === undefined) return console.log('lock model not loaded')

  // lockModel.rotation.x += 0.002;
  lockModel.rotation.z += 0.03;
 
  renderer.render( scene, camera );
 
}