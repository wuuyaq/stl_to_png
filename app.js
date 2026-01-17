import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const gallery = document.getElementById('gallery');
const imagesGrid = document.getElementById('images-grid');
const loading = document.getElementById('loading');
const loadingProgress = document.getElementById('loading-progress');

let scene, camera, renderer;

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10000);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  renderer.setSize(1024, 1024);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight1.position.set(30, 60, 30);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight2.position.set(-30, 60, -30);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight3.position.set(0, -30, 30);
  scene.add(directionalLight3);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
  scene.add(hemisphereLight);
}

function loadSTL(arrayBuffer) {
  const loader = new STLLoader();
  return loader.parse(arrayBuffer);
}

function centerGeometry(geometry) {
  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox;
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);

  const positionAttribute = geometry.attributes.position;
  const positions = positionAttribute.array;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i] -= center.x;
    positions[i + 1] -= center.y;
    positions[i + 2] -= center.z;
  }

  positionAttribute.needsUpdate = true;
  geometry.computeBoundingBox();
  
  const size = new THREE.Vector3();
  geometry.boundingBox.getSize(size);
  
  const maxDim = Math.max(size.x, size.y, size.z);
  
  const fov = camera.fov * (Math.PI / 180);
  const distance = (maxDim * 0.7) / Math.tan(fov / 2);
  const cameraDistance = Math.max(distance, 1);

  return { cameraDistance, size };
}

function generateCameraViews(count) {
  const views = [];
  const goldenAngle = 2.39996323;

  for (let i = 0; i < count; i++) {
    const theta = i * goldenAngle * Math.PI;
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);

    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);

    views.push({ x, y, z });
  }

  return views;
}

async function renderImages(geometry, cameraDistance, numViews = 16) {
  const material = new THREE.MeshStandardMaterial({
    color: 0x4a90d9,
    metalness: 0.3,
    roughness: 0.5
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  const views = generateCameraViews(numViews);
  const images = [];

  camera.aspect = 1;
  camera.updateProjectionMatrix();

  for (let i = 0; i < views.length; i++) {
    loadingProgress.textContent = `Rendering view ${i + 1} of ${numViews}...`;

    camera.position.set(
      views[i].x * cameraDistance,
      views[i].y * cameraDistance,
      views[i].z * cameraDistance
    );
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);

    const dataURL = renderer.domElement.toDataURL('image/png');
    images.push(dataURL);

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  scene.remove(mesh);
  mesh.geometry.dispose();
  mesh.material.dispose();

  return images;
}

function displayImages(images, baseName) {
  imagesGrid.innerHTML = '';

  images.forEach((dataURL, index) => {
    const item = document.createElement('div');
    item.className = 'image-item';
    
    const img = document.createElement('img');
    img.src = dataURL;
    img.alt = `View ${index + 1}`;

    item.appendChild(img);

    item.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `${baseName}_view_${index + 1}.png`;
      link.href = dataURL;
      link.click();
    });

    imagesGrid.appendChild(item);
  });

  dropZone.classList.add('hidden');
  gallery.classList.add('show');
}

async function processSTL(file) {
  loading.classList.add('show');
  loadingProgress.textContent = 'Loading STL file...';

  try {
    const arrayBuffer = await file.arrayBuffer();
    
    initScene();
    loadingProgress.textContent = 'Parsing geometry...';
    const geometry = loadSTL(arrayBuffer);
    
    loadingProgress.textContent = 'Centering model...';
    const { cameraDistance, size } = centerGeometry(geometry);
    
    loadingProgress.textContent = 'Preparing render...';
    const images = await renderImages(geometry, cameraDistance, 16);
    
    displayImages(images, file.name.replace(/\.stl$/i, ''));
  } catch (error) {
    console.error('Error processing STL:', error);
    alert(`Error: ${error.message}`);
  } finally {
    loading.classList.remove('show');
  }
}

function handleFile(file) {
  if (!file.name.toLowerCase().endsWith('.stl')) {
    alert('Please select an STL file');
    return;
  }
  processSTL(file);
}

dropZone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  
  const file = e.dataTransfer.files[0];
  if (file) {
    handleFile(file);
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  if (!gallery.classList.contains('show')) return;
  
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.name.toLowerCase().endsWith('.stl')) {
    handleFile(file);
  }
});

initScene();
