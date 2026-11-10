import * as THREE from 'three';

const canvas=document.querySelector('#cyborg-canvas');
const host=document.querySelector('.hero-stage');
if(canvas&&host){
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(34,1,.1,100);
  camera.position.set(0,.15,8.6);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.25;
  scene.add(new THREE.AmbientLight(0x9ac9ce,1.8));
  const key=new THREE.DirectionalLight(0xb7fff5,3.2);key.position.set(3,4,5);scene.add(key);
  const rim=new THREE.PointLight(0x35e9d7,24,15);rim.position.set(-4,1,2);scene.add(rim);
  const blue=new THREE.PointLight(0x617dff,18,14);blue.position.set(3,-2,-1);scene.add(blue);
  const group=new THREE.Group();scene.add(group);
  const metal=new THREE.MeshStandardMaterial({color:0x91aeb5,metalness:.88,roughness:.24});
  const dark=new THREE.MeshStandardMaterial({color:0x142936,metalness:.92,roughness:.28});
  const black=new THREE.MeshStandardMaterial({color:0x07121b,metalness:.8,roughness:.3});
  const glowMat=new THREE.MeshStandardMaterial({color:0x6ff5df,emissive:0x26d9c8,emissiveIntensity:3,metalness:.3,roughness:.2});
  const faceGeo=new THREE.SphereGeometry(1,64,48);
  const head=new THREE.Mesh(faceGeo,metal);head.scale.set(1.18,1.58,.82);head.position.y=.55;group.add(head);
  const facePlate=new THREE.Mesh(new THREE.SphereGeometry(1,48,36),dark);facePlate.scale.set(.76,1.26,.19);facePlate.position.set(.49,.5,.65);facePlate.rotation.z=-.08;group.add(facePlate);
  const jaw=new THREE.Mesh(new THREE.BoxGeometry(1.25,.25,.66),dark);jaw.position.set(0,-.63,.48);jaw.rotation.x=-.12;group.add(jaw);
  const brow=new THREE.Mesh(new THREE.BoxGeometry(1.62,.16,.18),black);brow.position.set(0,.62,.76);group.add(brow);
  for(const x of [-.48,.48]){
    const eye=new THREE.Mesh(new THREE.BoxGeometry(.43,.065,.08),glowMat);eye.position.set(x,.36,.81);eye.rotation.z=x<0?.08:-.08;group.add(eye);
    const socket=new THREE.Mesh(new THREE.BoxGeometry(.56,.18,.12),black);socket.position.set(x,.36,.73);group.add(socket);socket.position.z=.68;eye.position.z=.78;
  }
  const nose=new THREE.Mesh(new THREE.BoxGeometry(.12,.5,.2),metal);nose.position.set(0,.03,.82);group.add(nose);
  const mouth=new THREE.Mesh(new THREE.BoxGeometry(.48,.035,.05),glowMat);mouth.position.set(.25,-.39,.79);group.add(mouth);
  for(const side of [-1,1]){
    const ear=new THREE.Mesh(new THREE.CylinderGeometry(.19,.22,.16,32),dark);ear.rotation.z=Math.PI/2;ear.position.set(side*1.12,.25,0);group.add(ear);
    const earGlow=new THREE.Mesh(new THREE.TorusGeometry(.14,.018,8,48),glowMat);earGlow.rotation.y=Math.PI/2;earGlow.position.set(side*1.22,.25,0);group.add(earGlow);
    const temple=new THREE.Mesh(new THREE.BoxGeometry(.1,.75,.13),glowMat);temple.position.set(side*.91,.35,.56);group.add(temple);
    const cheek=new THREE.Mesh(new THREE.BoxGeometry(.24,.32,.2),dark);cheek.position.set(side*.83,-.25,.57);group.add(cheek);
  }
  const neck=new THREE.Mesh(new THREE.CylinderGeometry(.48,.62,.8,32),dark);neck.position.set(0,-1.25,0);group.add(neck);
  const chest=new THREE.Mesh(new THREE.SphereGeometry(1,48,32),dark);chest.scale.set(1.65,.56,.55);chest.position.set(0,-1.85,-.03);group.add(chest);
  const core=new THREE.Mesh(new THREE.TorusGeometry(.28,.035,12,64),glowMat);core.position.set(0,-1.78,.5);group.add(core);
  const coreBall=new THREE.Mesh(new THREE.SphereGeometry(.13,24,24),glowMat);coreBall.position.set(0,-1.78,.51);group.add(coreBall);
  const ringMat=new THREE.MeshBasicMaterial({color:0x55e8dc,transparent:true,opacity:.34});
  for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(2.2+i*.24,.008,6,180),ringMat);ring.rotation.x=.95+i*.35;ring.rotation.y=.3+i*.55;group.add(ring);}
  const particleCount=900;const positions=new Float32Array(particleCount*3);
  for(let i=0;i<particleCount;i++){const radius=THREE.MathUtils.randFloat(2.8,6.8),a=Math.random()*Math.PI*2,y=THREE.MathUtils.randFloatSpread(7);positions[i*3]=Math.cos(a)*radius;positions[i*3+1]=y;positions[i*3+2]=Math.sin(a)*radius-1;}
  const pGeo=new THREE.BufferGeometry();pGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const particles=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0x7cf5e5,size:.018,transparent:true,opacity:.7}));scene.add(particles);
  let targetX=0,targetY=0;
  host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();targetY=((e.clientX-r.left)/r.width-.5)*.42;targetX=((e.clientY-r.top)/r.height-.5)*.24;},{passive:true});
  host.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
  new ResizeObserver(resize).observe(host);resize();
  const clock=new THREE.Clock();
  function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();group.rotation.y+=(targetY+Math.sin(t*.35)*.035-group.rotation.y)*.035;group.rotation.x+=(targetX+Math.sin(t*.28)*.018-group.rotation.x)*.035;group.position.y=Math.sin(t*.7)*.045;core.scale.setScalar(1+Math.sin(t*2.4)*.08);particles.rotation.y=t*.018;renderer.render(scene,camera);}
  animate();
}
