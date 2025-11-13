/* eslint-disable no-undef */
import RBush from "rbush";
// import globalMercator from 'global-mercator'
let globalMercator = require("global-mercator");
export const createMRTWithStyle = (Cesium, options) => {
     function MRTProvider(options) {
          options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
          this._tilingScheme = Cesium.defined(options.tilingScheme)
               ? options.tilingScheme
               : new Cesium.WebMercatorTilingScheme({ ellipsoid: options.ellipsoid });
          this._tileWidth = Cesium.defaultValue(options.tileWidth, 256);
          this._viewer = options.viewer;
          this._camera = options.camera;
          this._tileHeight = Cesium.defaultValue(options.tileHeight, 256);
          this._readyPromise = Cesium.when.resolve(true);
          //   this._readyPromise = undefined;
          this._rectangle = this._tilingScheme.rectangle;
          this.tree = new RBush();
          //chinhhd load style from json file
          let styleResource = Cesium.Resource.createIfNeeded(options.styleUrl);
          _loadMapStyle(this.tree, styleResource);
          this._resource = styleResource;
          this._key = Cesium.defaultValue(options.key, "");
          this._url = Cesium.defaultValue(options.url, "");
          this._tileQueue = new Cesium.TileReplacementQueue();
          this._cacheSize = 1000;
     }
     Object.defineProperties(MRTProvider.prototype, {
          viewer: {
               get: function () {
                    return this._viewer;
               },
          },
          camera: {
               get: function () {
                    return this._camera;
               },
          },
          proxy: {
               get: function () {
                    return undefined;
               },
          },

          tileWidth: {
               get: function () {
                    return this._tileWidth;
               },
          },

          tileHeight: {
               get: function () {
                    return this._tileHeight;
               },
          },

          maximumLevel: {
               get: function () {
                    return undefined;
               },
          },

          minimumLevel: {
               get: function () {
                    return undefined;
               },
          },

          tilingScheme: {
               get: function () {
                    return this._tilingScheme;
               },
          },

          rectangle: {
               get: function () {
                    return this._tilingScheme.rectangle;
               },
          },

          tileDiscardPolicy: {
               get: function () {
                    return undefined;
               },
          },

          errorEvent: {
               get: function () {
                    return this._errorEvent;
               },
          },

          ready: {
               get: function () {
                    return this._resource;
               },
          },

          readyPromise: {
               get: function () {
                    return this._readyPromise;
               },
          },

          credit: {
               get: function () {
                    return undefined;
               },
          },

          hasAlphaChannel: {
               get: function () {
                    return true;
               },
          },
     });

     MRTProvider.prototype.getTileCredits = function (x, y, level) {
          return undefined;
     };

     function findTileInQueue(x, y, level, tileQueue) {
          let item = tileQueue.head;
          while (
               item !== undefined &&
               !(item.xMvt === x && item.yMvt === y && item.zMvt === level)
          ) {
               item = item.replacementNext;
          }
          return item;
     }

     function remove(tileReplacementQueue, item) {
          let previous = item.replacementPrevious;
          let next = item.replacementNext;

          if (item === tileReplacementQueue._lastBeforeStartOfFrame) {
               tileReplacementQueue._lastBeforeStartOfFrame = next;
          }

          if (item === tileReplacementQueue.head) {
               tileReplacementQueue.head = next;
          } else {
               previous.replacementNext = next;
          }

          if (item === tileReplacementQueue.tail) {
               tileReplacementQueue.tail = previous;
          } else {
               next.replacementPrevious = previous;
          }

          item.replacementPrevious = undefined;
          item.replacementNext = undefined;

          --tileReplacementQueue.count;
     }

     MRTProvider.prototype.requestImage = async function (x, y, level, request) {
          let mapLevel = this.getZoomLevel();
          const tolerance = 2;
          if (level < mapLevel - tolerance || level > mapLevel + tolerance) return;
          let cacheTile = findTileInQueue(x, y, level, this._tileQueue);
          if (cacheTile !== undefined) {
               console.log("return cache");
               return cacheTile;
          } else {
               let that = this;
               let tile = [x, y, level];
               // let tile = [x, y, level] // [x, y, zoom]
               let box = globalMercator.tileToBBox(tile, false);
               const searchBound = {
                    minX: box[0],
                    minY: box[3] * -1,
                    maxX: box[2],
                    maxY: box[1] * -1,
               };
               let styles = that.tree.search(searchBound);
               let arr_sid = [];
               if (styles && styles.length > 0) {
                    for (let i = 0; i < styles.length; i++) {
                         let si = styles[i];
                         if (si.minzoom <= level && level <= si.maxzoom)
                              arr_sid.push(styles[i].sid);
                    }
               }
               if (arr_sid.length === 0) {
                    // console.log('arr sid is null')
                    return;
               }

               let tilerequest = function (layerid, index, x, y, z) {
                    let url = that._url;
                    url = url
                         .replace("{x}", x)
                         .replace("{y}", y)
                         .replace("{z}", level)
                         .replace("{k}", layerid);
                    return Cesium.ImageryProvider.loadImage(this, url);
               };
               if (arr_sid.length === 1) return tilerequest(arr_sid[0], 0, x, y, level);
               else {
                    //merge ảnh
                    let canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    let ctx = canvas.getContext("2d");
                    let images = [];
                    for (let i = 0; i < arr_sid.length; i++) {
                         let url = that._url;
                         let layerid = arr_sid[i];
                         url = url
                              .replace("{x}", x)
                              .replace("{y}", y)
                              .replace("{z}", level)
                              .replace("{k}", layerid);
                         images.push(url);
                    }
                    await loadImages(ctx, images);
                    if (isCanvasBlank(canvas)) {
                         ctx.fillStyle = "#3e545b";
                         ctx.rect(0, 0, canvas.width, canvas.height);
                         ctx.fill();
                    }
                    return canvas;
               }
          }
     };

     function isCanvasBlank(canvas) {
          const canvasData = canvas
               .getContext("2d")
               .getImageData(0, 0, canvas.width, canvas.height).data;
          return !canvasData.some((channel) => channel !== 0);
     }

     MRTProvider.prototype.getZoomLevel = function () {
          // let viewer = this.viewer;
          let viewer = window["cesiumViewer"];
          let height = viewer.camera.positionCartographic.height;
          let scene = viewer.scene;
          let tileProvider = scene.globe._surface.tileProvider;
          let quadtree = tileProvider._quadtree;
          let drawingBufferHeight = viewer.cesiumWidget.canvas.height;
          let sseDenominator = viewer.camera.frustum.sseDenominator;

          for (let level = 0; level <= 19; level++) {
               let maxGeometricError = tileProvider.getLevelMaximumGeometricError(level);
               let error = (maxGeometricError * drawingBufferHeight) / (height * sseDenominator);
               if (error < quadtree.maximumScreenSpaceError) {
                    return level;
               }
          }
          return null;
     };
     async function loadImages(context, imageUrlArray) {
          const promiseArray = []; // create an array for promises
          const imageArray = []; // array for the images

          for (let imageUrl of imageUrlArray) {
               promiseArray.push(
                    new Promise((resolve) => {
                         const img = new Image();
                         img.crossOrigin = "anonymous";
                         img.onload = function () {
                              context.drawImage(img, 0, 0);
                              resolve(img);
                         };
                         img.src = imageUrl;
                         imageArray.push(img);
                    })
               );
          }

          await Promise.all(promiseArray); // wait for all the images to be loaded
          return imageArray;
     }

     async function _loadMapStyle(rtree, styleResource) {
          let rootStyle = await styleResource.fetchJson();
          let sources = rootStyle.sources;
          for (let srcKey in sources) {
               let source = sources[srcKey];
               let surl = source.url;
               let sresource = Cesium.Resource.createIfNeeded(surl);
               sresource.fetchJson().then(function (substyle) {
                    let bounds = substyle.bounds;
                    const item = {
                         minX: bounds[0],
                         minY: bounds[1],
                         maxX: bounds[2],
                         maxY: bounds[3],
                         sid: substyle.id,
                         minzoom: substyle.minzoom,
                         maxzoom: substyle.maxzoom,
                    };
                    rtree.insert(item);
               });
          }
     }

     return new MRTProvider(options);
};

// function _loadMapStyle(styleResource) {
//     styleResource.fetchJson().then(rootStyle => {
//         let sources = rootStyle.sources;
//         let layers = rootStyle.layers;
//         console.log(rootStyle);
//         console.log(layers.length);
//         // const styles = [];

//         let torelance = 0;//0.0670095;
//         for (let srcKey in sources) {
//             let source = sources[srcKey];
//             let surl = source.url;
//             let sresource = Cesium.Resource.createIfNeeded(surl);
//             sresource.fetchJson().then(function (substyle) {
//                 // console.log('substyle');
//                 let bounds = substyle.bounds;
//                 let minX = bounds[0] - torelance;
//                 let minY = bounds[1] - torelance;
//                 let maxX = bounds[2] + torelance;
//                 let maxY = bounds[3] + torelance;
//                 const item = {
//                     minX: minX,
//                     minY: minY,
//                     maxX: maxX,
//                     maxY: maxY,
//                     sid: substyle.id,
//                     minzoom: substyle.minzoom,
//                     maxzoom: substyle.maxzoom
//                 };
//                 baselayer_rtree.insert(item);
//             })
//         }
//     })
// }
