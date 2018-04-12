const WIDTH = window.innerWidth,
      HEIGHT =  window.innerHeight,
      ASPECT = WIDTH/HEIGHT;

const VIEW_ANGLE = 65;
const NEAR = 0.1,
      FAR = 5000;
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

var globalCameraX = 100;
var globalCameraY = 300;
var globalCameraZ = 300;
const cubeCamera = new THREE.CubeCamera(NEAR, FAR, 1024); 


camera.position.set(globalCameraX, globalCameraY, globalCameraZ);

const scene = new THREE.Scene();


var controls = new THREE.OrbitControls( camera );
//camera.position.set( 40, 60, 50 );
camera.lookAt(0, 0, 0);
controls.update();
//controls.autoRotate = true;
 
//sphere object
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0061ff});
const sphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS), sphereMaterial);
sphere.position.z = 0;
sphere.position.x = 0;

function generatePlane(){
    var geo = new THREE.PlaneBufferGeometry(10000, 10000, 8, 8);
    var mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.FrontSide });
    //scene.add(cubeCamera);
    //cubeCamera.lookAt(0, 0, 0);
    //cubeCamera.position.set( 0, -500, -10);
    //var mirrorMaterial = new THREE.MeshBasicMaterial( { envMap: cubeCamera.renderTarget.texture } );
    //mat.envMap = cubeCamera.renderTarget.texture;
    var plane = new THREE.Mesh(geo, mat);
    plane.rotateX(-Math.PI/2  + 0.01);
    //plane.recieveShadow = true;
    plane.position.y = -410;
    scene.add(plane);
}

function pathCurve(){
    function customPath( scale ) {
        THREE.Curve.call( this );
        this.scale = ( scale === undefined ) ? 1 : scale;
    }
    customPath.prototype = Object.create( THREE.Curve.prototype );
    customPath.prototype.constructor = customPath;
    customPath.prototype.getPoint = function ( t ) {
//        var tx = t * ( t - 1 ) * ( t - 3 ) * ( t - 7 ); //x^4 - 11x^3 + 31x^2 - 21x
//        var ty = t * ( t - 1 ) * ( t - 2 ) * ( t - 6 ) * ( t + 6 ); //y^5 - 3y^4 - 34y^3 + 108y^2 - 72y
        var tx = Math.cos( Math.PI * t * 8 );
        var ty = Math.cos( Math.PI * t * 10);
        var tz = Math.sin( Math.PI * t * 10);
        //y\left(y-1\right)\left(y-2\right)\left(y-6\right)\left(y+6\right)=x\left(x-1\right)\left(x-3\right)\left(x-7\right)
        return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
    };
    var path = new customPath( 400 );
    path.autoClose = false;
    var geometry = new THREE.TubeBufferGeometry( path, 2000, 10, 80, true );
    var material = new THREE.MeshPhongMaterial( { color: 0xff6e00 } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
}

function generatePath(){
//    var v1 = new THREE.Vector3( 1, 1, 1 );
//    var v2 = new THREE.Vector3( 50, 50, 20 );
//    var v3 = new THREE.Vector3( 10, 70, 40 );
//    var v4 = new THREE.Vector3( 23, 200, 320 );
//    var v5 = new THREE.Vector3( 500, 20, 60 );
//    var v6 = new THREE.Vector3( 50, 50, 20 );
//    
//    var path1 = new THREE.LineCurve3(v1, v2);
    //path1.lineTo(v3);
    pathCurve();
    
//    path1.add(v3);
//    var path2 = new THREE.LineCurve3(v3, v4);
//    var path3 = new THREE.LineCurve3(v5, v6);
//    
//    var curvePath = new THREE.CurvePath();
//    curvePath.add(path1);
//    curvePath.add(path2);
//    curvePath.add(path3);
//    
//    var v1 = new THREE.Vector2( 1, 1 );
//    var v2 = new THREE.Vector2( 30, 30 );
//    var path = new THREE.LineCurve(v1, v2);
    //path1.updateArcLengths();
    
    
//    console.log(path1.getPoints());
//    var geometry = new THREE.TubeGeometry( path1, 20, 10, 18, true);
//    var material = new THREE.MeshLambertMaterial( 
//        { color: 0xFFFFFF }
//    );
//    var mesh = new THREE.Mesh(geometry, material);
//    //mesh.recieveShadow = true;
//    scene.add(mesh);
    
}

function init(){
    //attatch to DOM element
    const container = document.querySelector('#container');
    
    //change background color to light blue
    scene.background = new THREE.Color( 0x111111 );
    
    //add camera for viewer
    //scene.add(camera);
    
    
    
    //renderer setup
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild(renderer.domElement);
    
    generatePath();
    
    
//    var heartShape = new THREE.Shape();
//
//    heartShape.moveTo( 25, 25 );
//    heartShape.lineTo( 25, 50 );
//    heartShape.lineTo( 35, 50 );
//    heartShape.lineTo( 45, 50 );
//    heartShape.bezierCurveTo( 45, 20, 0 ,0 ,0 );
//
//    var extrudeSettings = { amount: 10, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 5, bevelThickness: 10 };
//
//    var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
//
//    var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
//    
//    scene.add(mesh);
    
    generatePlane();
   
    //add3DModel();
    //objectLoad();
    //scene.add(sphere);
    generatePointLight();
    renderer.render(scene, camera);

    //play loop
    animate();
}
    var scales = 0;
const scaleFactor = 380;
function animate() {
    requestAnimationFrame(animate);
    render();
    controls.update();
    
    camera.position.set(globalCameraX, globalCameraY, globalCameraZ);
    //cubeCamera.position.set(globalCameraX, globalCameraY, globalCameraZ);
    
    scales += 0.0002;
    
    globalCameraX = Math.cos( Math.PI * scales * 8 ) * scaleFactor + 20;
    globalCameraY = Math.cos( Math.PI * scales * 10) * scaleFactor + 20;
    globalCameraZ = Math.sin( Math.PI * scales * 10) * scaleFactor;
    
    camera.lookAt(
        Math.cos( Math.PI * (scales + 0.01) * 8 ) * scaleFactor,
        Math.cos( Math.PI * (scales + 0.01) * 10) * scaleFactor, 
        Math.sin( Math.PI * (scales + 0.01) * 10) * scaleFactor
    );
    
//    cubeCamera.lookAt(
//        Math.cos( Math.PI * (scales + 0.01) * 8 ) * scaleFactor,
//        Math.cos( Math.PI * (scales + 0.01) * 10) * scaleFactor, 
//        Math.sin( Math.PI * (scales + 0.01) * 10) * scaleFactor
//    );
}

function render(){

    renderer.render(scene, camera);
    //cubeCamera.updateCubeMap(renderer, scene);
}

function generatePointLight(){
//    const pointLight = new THREE.PointLight(0x333333);
//    pointLight.position.x = 200;
//    pointLight.position.y = 250;
//    pointLight.position.z = 0;
//    scene.add(pointLight);
//    const pointLight2 = new THREE.PointLight(0x333333);
//    pointLight.position.x = 200;
//    pointLight.position.y = 250;
//    pointLight.position.z = 300;
//    scene.add(pointLight);
//    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    scene.add(light);
    
    light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(0, 0, -1);
    scene.add(light);
    
    var ambient = new THREE.AmbientLight(0x888888);
    scene.add(ambient);
    
}
function add3DModel(){
    
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath( 'assets/city/' );
    mtlLoader.setPath( 'assets/city/' );
    var url = "Organodron_City.mtl";
    mtlLoader.load( 
        url,
        function(materials){
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( 'assets/city/' );
            objLoader.load( 
                'Organodron City.obj',
                function (object) {
                    object.position.y = -25;
                    object.position.x = -20;
                    object.position.z = 150;
                    scene.add(object);
                }, function ( xhr ) {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function ( error ) {
                    console.log( 'An error happened' );
                } 
            );
        }
    );  
}
function objectLoad(){
    var loader = new THREE.OBJLoader();
    loader.load( 
        'assets/city/Organodron City.obj',
        function ( object ) {
            object.traverse( function ( child ) {
                if( child instanceof THREE.Mesh ) {
                    child.material.color.setHex(0x999999);
                }
            });
            object.position.y = 0;
            scene.add(object); 
            
        }, 
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
        } 
    );
}
