'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "32b7b7b1a9e2fde14cbdb2ca44eefb44",
".git/config": "13f8e970f4d187adea65af6e9ae59bd2",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "75b390a2e0075aac14bb3a907c8c9e07",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "b69ff34bbf4050b7670272df6386f46c",
".git/logs/refs/heads/main": "b3649c637d18b8acd270dfe0b8acd870",
".git/logs/refs/remotes/origin/main": "d3ca04cd520a6e87becd2c25ee0eda5c",
".git/logs/refs/remotes/origin/master": "e814deb21e7951a3bdf1fad92d963606",
".git/objects/02/1d4f3579879a4ac147edbbd8ac2d91e2bc7323": "9e9721befbee4797263ad5370cd904ff",
".git/objects/08/b3d8e79045ca9a13ac1b4e95aa405410d8f34c": "f7fc39ceab0deb097cf8693ba1795d2b",
".git/objects/0d/49e1819076a4c31457960279d7c2f342e576eb": "d48f499513851a9c21de11c2ecd50775",
".git/objects/11/ada25808ad47aba43865085fb13262e17a5724": "fe7974025158d0226a06ddad15ecaf07",
".git/objects/20/3a3ff5cc524ede7e585dff54454bd63a1b0f36": "4b23a88a964550066839c18c1b5c461e",
".git/objects/22/d9064be7af0a48d9e94226b04a0cdde8bca94e": "e8a3b9ff2df7b23cfb37b3b63c4643ac",
".git/objects/27/93b296bc9dacc45c5f320997d209652055c444": "976916b46657f162afe0c97ed4e38d47",
".git/objects/28/91afdfd32dc15fb5820719ce86653bb4f106e6": "517cfb66547d16ffebc89a4f7e94afac",
".git/objects/29/f22f56f0c9903bf90b2a78ef505b36d89a9725": "e85914d97d264694217ae7558d414e81",
".git/objects/2a/bf25d121c418e7b2a5e7e14a750463a2f64dc8": "257688c40e4cd6d55e32b6c500f4a2ce",
".git/objects/2d/5d4e66723295ac4c82ab1d189199d8fe3dff5c": "5b89adf1e5b96775273183eafd2a4ba0",
".git/objects/35/cdc34cce658505a9d2e0e4db8a45c7276c80ca": "3a1802c10714748492597b55adaf02e3",
".git/objects/36/207a05427eb756c7721e346ed79cd4d8de785c": "7540b366d215328e3f298bbc923d3e4e",
".git/objects/39/dfe6fe092df90f693cf723dc06c8770d2cb84e": "8a99a95902dce98bf436091aeddeeca7",
".git/objects/3c/21a501f50c7a6307d72fe9b27f33c0f7fb4096": "80c4ee77f049b18ab85f45fc0e986900",
".git/objects/47/83b71a4ce50dc5c491273ad0468ed85421712a": "cea470d5267e57b4dc5cf0932d0052f7",
".git/objects/4c/485008eb73092c5cd834e8799957d7bcf579f4": "d2b2ac7e95493277d0600c4c806c2942",
".git/objects/4d/bf9da7bcce5387354fe394985b98ebae39df43": "534c022f4a0845274cbd61ff6c9c9c33",
".git/objects/4e/b3a1859b36e2fdf780d63a07617f621a2cc371": "4f96ca7a879da82ed8893c79b96c57bd",
".git/objects/4f/40dabe4430b4d7288c6ae92d8fc3e17cf8e410": "7c1843130f2c3787540ded5445c7793a",
".git/objects/4f/58207895f0a53122f284607de9885bfd6f1915": "aca60b4c8e1035bbcc95d7aee48cda1b",
".git/objects/4f/fbe6ec4693664cb4ff395edf3d949bd4607391": "2beb9ca6c799e0ff64e0ad79f9e55e69",
".git/objects/50/de41c8315c248a4b380111aeb4d8faa5ac5a40": "b8583ff2d9af57a0745d7845cf867d55",
".git/objects/59/de290431a60bc8000b570ade56561952ce1036": "630812854732f3368938a7680cc57b34",
".git/objects/5a/878caa2db166e134d942ac1c5007830235065f": "fdcec4a25860ce909e182b47c40f57b3",
".git/objects/5e/1446b304405ca6ef637fe6260447c7b882c7c8": "5761c4071c9343f40f27a1bb4cdc4c9c",
".git/objects/5e/9a8ced36ddaf74a0dccc1f6183c1d3b4ec70c1": "aea090b81277dee42faff27fe55984f7",
".git/objects/5e/ddad551c773fab41e3da47580f335fc13454fd": "d1e76096c22396806b834e5b8d9c3a0a",
".git/objects/67/d4f4b2b6eb715202a18264addbab7ad089f489": "a62346e80baef876500066a6c9ab736d",
".git/objects/6a/6b1bfa26716bc3e0f74245243ea0bd3f05783e": "c834665351d9b63c544e58f77987423f",
".git/objects/6b/9862a1351012dc0f337c9ee5067ed3dbfbb439": "85896cd5fba127825eb58df13dfac82b",
".git/objects/6f/e3f7a4aad9eb527bb65c24c4345e7234e866dc": "96e840406ae8efc6a85debcec3fa1027",
".git/objects/74/f237f1e4b5aa74edb6fd6055263b32fa8207ac": "e94406374c84b5b4b945842751a7f28f",
".git/objects/7a/6c1911dddaea52e2dbffc15e45e428ec9a9915": "f1dee6885dc6f71f357a8e825bda0286",
".git/objects/7c/4c2d92d354ded02766d7abcc7d7d8f9feebd9c": "4556eaa8e4c65673c77a62469181491f",
".git/objects/81/00e1966977b63623d76b9750aa097b44672b3a": "8b56437c6c33549bf54e2e256d5019bf",
".git/objects/82/039646eae58381941a128edf3dd254c98a2961": "ba71a4099c57c699fe2ac9b609735b8e",
".git/objects/83/90b5032643cde9e8566c4c4ff0b2252f1da4d3": "292d576f190f0f70de3e5fc037ffe25b",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8b/7d78b0d717564b4fa799a065733de6aea82138": "4d64304170c2128dc996d7974c3b02ff",
".git/objects/90/99a38431a7715b42101f449e34fd731df96fea": "6b27340990cbbb8fc36be59895200bdb",
".git/objects/95/323484b2e4b67686fa68cd98ed9db71d082362": "d4835a81112f31e7364f767c630dd0ea",
".git/objects/98/0d49437042d93ffa850a60d02cef584a35a85c": "8e18e4c1b6c83800103ff097cc222444",
".git/objects/9b/3ef5f169177a64f91eafe11e52b58c60db3df2": "91d370e4f73d42e0a622f3e44af9e7b1",
".git/objects/9e/3ade17269f9fcb38b94f24d91ebbc82e927665": "6b4b7042e84fb22f0868a252612e6fa1",
".git/objects/9e/3b4630b3b8461ff43c272714e00bb47942263e": "accf36d08c0545fa02199021e5902d52",
".git/objects/a2/dedc6c33a17a9e22efdb9f2704094efa81448d": "818dcde0f6d03939acdc3bbd938caee1",
".git/objects/a5/8d40faa276a3cc6d1d8107eee9c6faf4af55ab": "2c8b364cb480419176bd502b4b685394",
".git/objects/a9/b2d8393bec3458502fee813dbb178b4d57eb71": "8eb258028a79773b922015eb19a1a3a4",
".git/objects/aa/090e8bfe0fd8bb26312f851ea78ca408a8490e": "a00cf3746153b899d0a35d3cf2f29011",
".git/objects/ac/f18b33401efe6395a406a9319cf33293e3e410": "5b37576bc1f575fec4ea971b7a00af5f",
".git/objects/af/ffeb8474a6c68d2a4e7c9b557586554d9d825c": "64c003b1af1217caeb84ce0fffd2f96e",
".git/objects/b6/b8806f5f9d33389d53c2868e6ea1aca7445229": "b14016efdbcda10804235f3a45562bbf",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b7/99cacdfe3856debf32ed79f27d533ade3ece0a": "fc4aa5cd3a81b103603f45a3e6ef9ea4",
".git/objects/b7/e25daa55d9a5ebca25dfc9a05f0e5c9babe74d": "11015df41ff12248e114defd4fe72dd2",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/c1/945435c6f832407efde2491c21a5af097f902b": "9b82e4214af31ce555ece9be727de1bf",
".git/objects/c2/7b35f736a5ce0ff1feee3d73c55a811e68c2df": "3d9152b49bbb22168c694ef112c06bf0",
".git/objects/c3/7911905c64c7a3e9413f90fcf3da1035dc24f2": "64d6a888f4b53e4d5697eb93575d00fa",
".git/objects/c4/016f7d68c0d70816a0c784867168ffa8f419e1": "fdf8b8a8484741e7a3a558ed9d22f21d",
".git/objects/c7/86a051c7f93b108a8c5fffa7f7ed8c31986e25": "db40a31af8a8a0392b41366189bfcc63",
".git/objects/ca/3bba02c77c467ef18cffe2d4c857e003ad6d5d": "316e3d817e75cf7b1fd9b0226c088a43",
".git/objects/ce/f1b6bba23f076084a075360ab4b13ecc1f4041": "a3beaf409bd6ddaf1b1c4d7d05c9a220",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d5/95e2806a069a8b6863d5e1755e5d37ebaeb538": "26999ce129cbca9064b7435a1331ee72",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/db/6e8e438d3c8aaef8fcc0bd7a4adbf0bc9eb635": "c7561ee280d823c21de55b929e418061",
".git/objects/e2/4796d812c4e5c97cec0783fb9c0f910c0fb591": "26e23fca776466bec9a26a9e48f8db5b",
".git/objects/e3/e9ee754c75ae07cc3d19f9b8c1e656cc4946a1": "14066365125dcce5aec8eb1454f0d127",
".git/objects/e8/a44af79329c4c8b0427012643e4041329f20ec": "b31d9cf70a254a3fe25e2ca4d6d72484",
".git/objects/e9/94225c71c957162e2dcc06abe8295e482f93a2": "2eed33506ed70a5848a0b06f5b754f2c",
".git/objects/e9/ca58d2cb59ca00972e76de48fe57c438d28c3a": "b6f053d8eba26d2f5fbc7590b9227d0f",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/ed/b55d4deb8363b6afa65df71d1f9fd8c7787f22": "886ebb77561ff26a755e09883903891d",
".git/objects/ed/d990a6b4a972cc2a0a4df30efc171244d37fe2": "404db3c3f07afc16a33b1b586b253d95",
".git/objects/f0/9684a8bc1db9760ccff3a96b09f3df59b9f5dd": "72a1393b81c85a4ea7fa0acc0e1b9227",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f5/72b90ef57ee79b82dd846c6871359a7cb10404": "e68f5265f0bb82d792ff536dcb99d803",
".git/objects/fb/accd605264f1257272e38499cb192483bb6f57": "dac79414a9f72e99e7a08d4e002f3a2f",
".git/objects/fe/3b987e61ed346808d9aa023ce3073530ad7426": "dc7db10bf25046b27091222383ede515",
".git/refs/heads/main": "1cb412806536dbe94bc263debcb69e5e",
".git/refs/remotes/origin/main": "1cb412806536dbe94bc263debcb69e5e",
".git/refs/remotes/origin/master": "9f4a5a36af062343c1376dc821b737c3",
"404.html": "873ea07c562f4801359582b283edfdc3",
"assets/AssetManifest.bin": "e1d4ca21bf4b45aec00f7580efae5c7f",
"assets/AssetManifest.bin.json": "3d29b231db5e8ba0012344e3c6464f8b",
"assets/AssetManifest.json": "cc48bbdc0f5299452b214f925b464482",
"assets/assets/images/boisson_1774365072453.png": "8bd024d7161cf62a5d48d74119d777ca",
"assets/assets/images/dessert_1774364996242.png": "f30034a2d5d208d99b92f892b15fc4be",
"assets/assets/images/entree_1774365292841.png": "e8622c238d395aea9eb9edacd56289fc",
"assets/assets/images/plat_1774364960085.png": "818cc1effa9bd402fc62b4d1fc0462c9",
"assets/FontManifest.json": "c75f7af11fb9919e042ad2ee704db319",
"assets/fonts/MaterialIcons-Regular.otf": "b4c976060fe95431cfc1a52528e999d5",
"assets/NOTICES": "cb23ab869a0c747d942401e9dacf570d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Brands-Regular-400.otf": "d40c67ce9f52d4bf087e61453006393c",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Regular-400.otf": "b2703f18eee8303425a5342dba6958db",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Solid-900.otf": "5b8d20acec3e57711717f61417c1be44",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "de9d410f689f164397a8f61af3fec283",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "2f069f377a58710ce3ebca748092a54f",
"/": "2f069f377a58710ce3ebca748092a54f",
"main.dart.js": "02ff3c2d22a193e07b2e3fa547fb0bfc",
"manifest.json": "2e4e7805f0e3bef8966c6a1b108ebd6e",
"version.json": "1d2d1bdbc46d2b9271ba4ef526603025"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
