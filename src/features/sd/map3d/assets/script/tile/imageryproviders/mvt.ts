import {
     createCustomStyle,
     createMapboxStreetsV6Style,
     _loadCustomStyle,
     _loadJsonStyle,
} from "../openlayers4mvt/mapbox-streets-v6-style";
export const createMVTWithStyle = function (options) {
     function MVTProvider(options) {
          options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);

          this._tilingScheme = Cesium.defined(options.tilingScheme)
               ? options.tilingScheme
               : new Cesium.WebMercatorTilingScheme({ ellipsoid: options.ellipsoid });

          this._tileWidth = Cesium.defaultValue(options.tileWidth, 512);
          this._tileHeight = Cesium.defaultValue(options.tileHeight, 512);
          this._minimumLevel = Cesium.defaultValue(options.minimumLevel, 1);
          this._maximumLevel = Cesium.defaultValue(options.maximumLevel, 18);
          this._readyPromise = Cesium.when.resolve(true);
          this._ol = ol;
          this._mvtParser = new this._ol.format.MVT();
          //chinhhd load style from json file
          if (options.styleUrl && options.styleUrl !== "") {
               let styleResource = Cesium.Resource.createIfNeeded(options.styleUrl);
               _loadJsonStyle(styleResource);
               this._styleFun = createMapboxStreetsV6Style;
          } else if (options.style) {
               _loadCustomStyle(options.layer, options.style);
               this._styleFun = createCustomStyle;
          }
          this._reprojectComputeCommands = [];
          this._key = Cesium.defaultValue(options.key, "");
          this._url = Cesium.defaultValue(options.url, "");
          // this._url = Cesium.defaultValue(options.url, "https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token={k}");

          let sw = this._tilingScheme._rectangleSouthwestInMeters;
          let ne = this._tilingScheme._rectangleNortheastInMeters;
          let mapExtent = [sw.x, sw.y, ne.x, ne.y];
          this._resolutions = ol.tilegrid.resolutionsFromExtent(mapExtent, 22, this._tileWidth);

          this._pixelRatio = 1;
          this._transform = [0.125, 0, 0, 0.125, 0, 0];
          this._replays = ["Default", "Image", "Polygon", "LineString", "Text"];
          this._tileQueue = new Cesium.TileReplacementQueue();
          this._cacheSize = 1000;
          let credit;
          if (options.credit && typeof options.credit === "string") {
               credit = new Cesium.Credit(credit);
          } else {
               credit = new Cesium.Credit("");
          }
          this._credit = credit;
          this.imageryProvider = this;
     }
     Object.defineProperties(MVTProvider.prototype, {
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
                    return true;
               },
          },

          readyPromise: {
               get: function () {
                    return this._readyPromise;
               },
          },

          credit: {
               get: function () {
                    return this._credit;
               },
          },

          hasAlphaChannel: {
               get: function () {
                    return true;
               },
          },
     });

     MVTProvider.prototype.getTileCredits = function (x, y, level) {
          return undefined;
     };

     MVTProvider.prototype.queueReprojectionCommands = function (frameState) {
          let computeCommands = this._reprojectComputeCommands;
          let length = computeCommands.length;
          for (let i = 0; i < length; ++i) {
               frameState.commandList.push(computeCommands[i]);
          }
          computeCommands.length = 0;
     };

     MVTProvider.prototype.cancelReprojections = function () {
          this._reprojectComputeCommands.forEach(function (command) {
               if (Cesium.defined(command.canceled)) {
                    command.canceled();
               }
          });
          this._reprojectComputeCommands.length = 0;
     };

     MVTProvider.prototype._createTileImagerySkeletons = function (
          tile,
          terrainProvider,
          insertionPoint
     ) {
          return true;
     };

     function findTileInQueue(x, y, level, tileQueue) {
          let item = tileQueue.head;
          while (item != undefined && !(item.xMvt == x && item.yMvt == y && item.zMvt == level)) {
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

     function trimTiles(tileQueue, maximumTiles) {
          let tileToTrim = tileQueue.tail;
          while (tileQueue.count > maximumTiles && Cesium.defined(tileToTrim)) {
               let previous = tileToTrim.replacementPrevious;

               remove(tileQueue, tileToTrim);
               // delete tileToTrim;
               tileToTrim = null;

               tileToTrim = previous;
          }
     }

     MVTProvider.prototype.requestImage = async function (x, y, level, request) {
          if (level <= this.minimumLevel || level >= this.maximumLevel) return;
          let cacheTile = findTileInQueue(x, y, level, this._tileQueue);
          if (cacheTile != undefined) {
               return cacheTile;
          } else {
               let that = this;
               let url = this._url;
               url = url
                    .replace("{x}", x)
                    .replace("{y}", y)
                    .replace("{z}", level)
                    .replace("{k}", this._key);
               let tilerequest = async function (x, y, z) {
                    let resource = Cesium.Resource.createIfNeeded(url);

                    return resource
                         .fetchArrayBuffer()
                         .then(function (arrayBuffer) {
                              let canvas: any = document.createElement("canvas");
                              canvas.width = 512;
                              canvas.height = 512;
                              let vectorContext = canvas.getContext("2d");

                              let features = that._mvtParser.readFeatures(arrayBuffer);

                              let styleFun = that._styleFun();

                              let extent = [0, 0, 4096, 4096];
                              let _replayGroup = new ol.render.canvas.ReplayGroup(
                                   0,
                                   extent,
                                   8,
                                   true,
                                   100
                              );

                              for (let i = 0; i < features.length; i++) {
                                   let feature = features[i];
                                   let styles = styleFun(features[i], that._resolutions[level]);
                                   for (let j = 0; j < styles.length; j++) {
                                        ol.renderer.vector.renderFeature_(
                                             _replayGroup,
                                             feature,
                                             styles[j],
                                             16
                                        );
                                   }
                              }
                              _replayGroup.finish();

                              _replayGroup.replay(
                                   vectorContext,
                                   that._pixelRatio,
                                   that._transform,
                                   0,
                                   {},
                                   that._replays,
                                   true
                              );
                              if (that._tileQueue.count > that._cacheSize) {
                                   trimTiles(that._tileQueue, that._cacheSize / 2);
                              }

                              canvas.xMvt = x;
                              canvas.yMvt = y;
                              canvas.zMvt = z;
                              that._tileQueue.markTileRendered(canvas);

                              // delete _replayGroup;
                              _replayGroup = null;

                              return canvas;
                         })
                         .otherwise(function (error) {
                              //err
                         });
               };
               return tilerequest(x, y, level);
          }
     };

     MVTProvider.prototype.pickFeatures = function (x, y, level, longitude, latitude) {
          return undefined;
     };

     return new MVTProvider(options);
};
