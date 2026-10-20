const CACHE='viagem-lua-v24';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./img/ceu-base.jpg','./img/lua-horizonte.jpg','./img/parede-cabine.jpg','./img/fogo.jpg','./img/terra.jpg','./img/estrelas.jpg','./img/casco-foguete.jpg','./img/lua.jpg','./img/chao-lua.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js','./models/modulo-lunar.glb','./models/estacao-espacial.glb'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{mode:u.startsWith('http')?'no-cors':'same-origin'})).catch(()=>{}))))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isPage=e.request.mode==='navigate';
  e.respondWith(isPage
    ? fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r;}).catch(()=>caches.match('./index.html'))
    : caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}return r;})));
});
