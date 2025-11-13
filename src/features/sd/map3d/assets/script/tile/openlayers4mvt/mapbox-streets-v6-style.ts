/* eslint-disable no-undef */
// Styles for the mapbox-streets-v6 vector tile data set. Loosely based on
// http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6.json
let _styleLayers: any = {};
export const _loadJsonStyle = function (resource) {
  let res = resource;
  let styleLayers = new Object();
  _styleLayers = styleLayers;
  let that = this;
  resource.fetchJson().then(function (style) {
    // let indexUrl = res.getDerivedResource({
    //     url: '' + style.sprite + ".json"
    // }).url

    // let imageUrl = res.getDerivedResource({
    //     url: '/' + style.sprite + ".png"
    // }).url

    // let indexUrl = style.sprite + ".json"
    // let imageUrl = style.sprite + ".png";
    // console.log(indexUrl)
    // that._loadSprites(indexUrl, imageUrl);
    //console.log(imageUrl);
    //tiles layers must be ordered by the style order
    //cache style information into variable for use
    // let group = style.layers.reduce((r, a) => {
    //   r[a.id] = [...r[a.id] || [], a];
    //   return r;
    // }, {});
    // console.log('group')
    // console.log(group)
    for (let i = 0; i < Object.keys(style.layers).length; i++) {
      let layer = style.layers[i]["source-layer"];
      //if (LAYERS.indexOf(layer) < 0) continue;
      // styleLayers[style.layers[i]["id"]] = style.layers[i];
      styleLayers[layer] = style.layers[i];
    }
    return true;
  }).otherwise(function (error) {
    console.log("style error:" + error);
    return Cesium.when.reject("style error");
  });
}

// function _loadSprites(spriteIndexUrl, spriteImgUrl) {
//   //icons are loaded from a single png file
//   //locations specified in a json file
//   var resource = Resource.createIfNeeded(spriteIndexUrl);
//   var spriteIndexResource = resource.getDerivedResource({
//     url: spriteIndexUrl
//   });

//   var sprites = new Object();
//   this._sprites = sprites;
//   var image = new Image();
//   image.crossOrigin = "Anonymous";
//   image.onload = function () {
//     var spriteCanvas = document.createElement("canvas");
//     spriteCanvas.width = image.width;
//     spriteCanvas.height = image.height;
//     var spriteCtx = spriteCanvas.getContext("2d");
//     //spriteCtx.fillStyle = "red";
//     //spriteCtx.globalAlpha = 1.0;
//     //spriteCtx.fillRect(0, 0, image.width, image.height);
//     //spriteCtx.clearRect(0, 0, image.width, image.height);
//     spriteCtx.drawImage(image, 0, 0, image.width, image.height);

//     spriteIndexResource.fetchJson().then(function (spriteIndex) {
//       //cache image data for later use
//       for (var i = 0; i < Object.keys(spriteIndex).length; i++) {
//         var k = Object.keys(spriteIndex)[i];
//         var v = Object.values(spriteIndex)[i];
//         var data = spriteCtx.getImageData(v.x, v.y, v.width, v.height);
//         sprites[k] = data;
//       }
//     });

//   }
//   image.src = spriteImgUrl;
// }
function hslToHex(hsl) {
  hsl = hsl.replace(/hsl/g, '').replace('(', '').replace(')', '').replace(/%/g, '');
  let a_hsl = hsl.split(',');
  let h = a_hsl[0]
  let s = a_hsl[1]
  let l = a_hsl[2]
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const createMapboxStreetsV6Style = function () {
  let fill = new ol.style.Fill({ color: '' });
  let stroke = new ol.style.Stroke({ color: '', width: 1 });
  let polygon = new ol.style.Style({ fill: fill });
  let strokedPolygon = new ol.style.Style({ fill: fill, stroke: stroke });
  let line = new ol.style.Style({ stroke: stroke });
  let text = new ol.style.Style({
    text: new ol.style.Text({
      text: '', fill: fill, stroke: stroke
    })
  });
  let iconCache = {};
  function getIcon(iconName) {
    let icon = iconCache[iconName];
    if (!icon) {
      icon = new ol.style.Style({
        image: new ol.style.Icon({
          src: 'https://cdn.rawgit.com/mapbox/maki/master/icons/' + iconName + '-15.svg',
          imgSize: [15, 15]
        })
      });
      iconCache[iconName] = icon;
    }
    return icon;
  }
  let styles = [];
  return function (feature, resolution) {
    let length = 0;
    let layer = feature.get('layer');
    let cls = feature.get('class');
    let type = feature.get('type');
    let scalerank = feature.get('scalerank');
    let labelrank = feature.get('labelrank');
    let adminLevel = feature.get('admin_level');
    let maritime = feature.get('maritime');
    let disputed = feature.get('disputed');
    let maki = feature.get('maki');
    let geom = feature.getGeometry().getType();
    if (_styleLayers[layer]) {
      let style = _styleLayers[layer];
      if (style.type === 'fill') {
        fill.setColor(hslToHex(style.paint['fill-color']));
        styles[length++] = polygon;
      }
      else if (style.type === 'line') {
        stroke.setColor(hslToHex(style.paint['line-color']));
        stroke.setWidth(style.paint['line-width'].base);
        styles[length++] = line;
      }
      else {
        console.log(style.type)
      }
    }
    else {
      if (layer === 'landuse' && cls === 'park') {
        fill.setColor('#d8e8c8');
        styles[length++] = polygon;
      } else if (layer === 'landuse' && cls === 'cemetery') {
        fill.setColor('#e0e4dd');
        styles[length++] = polygon;
      } else if (layer === 'landuse' && cls === 'hospital') {
        fill.setColor('#fde');
        styles[length++] = polygon;
      } else if (layer === 'landuse' && cls === 'school') {
        fill.setColor('#f0e8f8');
        styles[length++] = polygon;
      } else if (layer === 'landuse' && cls === 'wood') {
        fill.setColor('rgb(233,238,223)');
        styles[length++] = polygon;
      } else if (layer === 'waterway' &&
        cls !== 'river' && cls !== 'stream' && cls !== 'canal') {
        stroke.setColor('#a0c8f0');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'waterway' && cls === 'river') {
        stroke.setColor('#a0c8f0');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'waterway' && (cls === 'stream' ||
        cls === 'canal')) {
        stroke.setColor('#a0c8f0');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'water') {
        fill.setColor('#a0c8f0');
        styles[length++] = polygon;
      } else if (layer === 'aeroway' && geom === 'Polygon') {
        fill.setColor('rgb(242,239,235)');
        styles[length++] = polygon;
      } else if (layer === 'aeroway' && geom === 'LineString' &&
        resolution <= 76.43702828517625) {
        stroke.setColor('#f0ede9');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'building') {
        fill.setColor('#f2eae2');
        stroke.setColor('#dfdbd7');
        stroke.setWidth(1);
        styles[length++] = strokedPolygon;
      } else if (layer === 'tunnel' && cls === 'motorway_link') {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'tunnel' && cls === 'service') {
        stroke.setColor('#cfcdca');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'tunnel' &&
        (cls === 'street' || cls === 'street_limited')) {
        stroke.setColor('#cfcdca');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'tunnel' && cls === 'main' &&
        resolution <= 1222.99245256282) {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'tunnel' && cls === 'motorway') {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'tunnel' && cls === 'path') {
        stroke.setColor('#cba');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'tunnel' && cls === 'major_rail') {
        stroke.setColor('#bbb');
        stroke.setWidth(2);
        styles[length++] = line;
      } else if (layer === 'road' && cls === 'motorway_link') {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'road' && (cls === 'street' ||
        cls === 'street_limited') && geom === 'LineString') {
        stroke.setColor('#cfcdca');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'road' && cls === 'main' &&
        resolution <= 1222.99245256282) {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'road' && cls === 'motorway' &&
        resolution <= 4891.96981025128) {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'road' && cls === 'path') {
        stroke.setColor('#cba');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'road' && cls === 'major_rail') {
        stroke.setColor('#bbb');
        stroke.setWidth(2);
        styles[length++] = line;
      } else if (layer === 'bridge' && cls === 'motorway_link') {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'bridge' && cls === 'motorway') {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'bridge' && cls === 'service') {
        stroke.setColor('#cfcdca');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'bridge' &&
        (cls === 'street' || cls === 'street_limited')) {
        stroke.setColor('#cfcdca');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'bridge' && cls === 'main' &&
        resolution <= 1222.99245256282) {
        stroke.setColor('#e9ac77');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'bridge' && cls === 'path') {
        stroke.setColor('#cba');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'bridge' && cls === 'major_rail') {
        stroke.setColor('#bbb');
        stroke.setWidth(2);
        styles[length++] = line;
      } else if (layer === 'admin' && adminLevel >= 3 && maritime === 0) {
        stroke.setColor('#9e9cab');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'admin' && adminLevel === 2 &&
        disputed === 0 && maritime === 0) {
        stroke.setColor('#9e9cab');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'admin' && adminLevel === 2 &&
        disputed === 1 && maritime === 0) {
        stroke.setColor('#9e9cab');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'admin' && adminLevel >= 3 && maritime === 1) {
        stroke.setColor('#a0c8f0');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'admin' && adminLevel === 2 && maritime === 1) {
        stroke.setColor('#a0c8f0');
        stroke.setWidth(1);
        styles[length++] = line;
      } else if (layer === 'country_label' && scalerank === 1) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('bold 11px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#334');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(2);
        styles[length++] = text;
      } else if (layer === 'country_label' && scalerank === 2 &&
        resolution <= 19567.87924100512) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('bold 10px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#334');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(2);
        styles[length++] = text;
      } else if (layer === 'country_label' && scalerank === 3 &&
        resolution <= 9783.93962050256) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('bold 9px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#334');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(2);
        styles[length++] = text;
      } else if (layer === 'country_label' && scalerank === 4 &&
        resolution <= 4891.96981025128) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('bold 8px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#334');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(2);
        styles[length++] = text;
      } else if (layer === 'marine_label' && labelrank === 1 &&
        geom === 'Point') {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont(
          'italic 11px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#74aee9');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'marine_label' && labelrank === 2 &&
        geom === 'Point') {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont(
          'italic 11px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#74aee9');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'marine_label' && labelrank === 3 &&
        geom === 'Point') {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont(
          'italic 10px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#74aee9');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'marine_label' && labelrank === 4 &&
        geom === 'Point') {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont(
          'italic 9px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#74aee9');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'place_label' && type === 'city' &&
        resolution <= 1222.99245256282) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('11px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#333');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'place_label' && type === 'town' &&
        resolution <= 305.748113140705) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('9px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#333');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'place_label' && type === 'village' &&
        resolution <= 38.21851414258813) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('8px "Open Sans", "Arial Unicode MS"');
        fill.setColor('#333');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'place_label' &&
        resolution <= 19.109257071294063 && (type === 'hamlet' ||
          type === 'suburb' || type === 'neighbourhood')) {
        text.getText().setText(feature.get('name_en'));
        text.getText().setFont('bold 9px "Arial Narrow"');
        fill.setColor('#633');
        stroke.setColor('rgba(255,255,255,0.8)');
        stroke.setWidth(1);
        styles[length++] = text;
      } else if (layer === 'poi_label' && resolution <= 19.109257071294063 &&
        scalerank === 1 && maki !== 'marker') {
        styles[length++] = getIcon(maki);
      } else if (layer === 'poi_label' && resolution <= 9.554628535647032 &&
        scalerank === 2 && maki !== 'marker') {
        styles[length++] = getIcon(maki);
      } else if (layer === 'poi_label' && resolution <= 4.777314267823516 &&
        scalerank === 3 && maki !== 'marker') {
        styles[length++] = getIcon(maki);
      } else if (layer === 'poi_label' && resolution <= 2.388657133911758 &&
        scalerank === 4 && maki !== 'marker') {
        styles[length++] = getIcon(maki);
      } else if (layer === 'poi_label' && resolution <= 1.194328566955879 &&
        scalerank >= 5 && maki !== 'marker') {
        styles[length++] = getIcon(maki);
      }
    }
    styles.length = length;
    return styles;
  };
}

export const _loadCustomStyle = function (layer, style) {
  // let styleLayers = new Object();
  // _styleLayers = styleLayers;
  _styleLayers[layer] = style;
}

export const createCustomStyle = function () {
  let fill = new ol.style.Fill({ color: '' });
  let stroke = new ol.style.Stroke({ color: '', width: 1 });
  let polygon = new ol.style.Style({ fill: fill });
  let strokedPolygon = new ol.style.Style({ fill: fill, stroke: stroke });
  let line = new ol.style.Style({ stroke: stroke });
  let text = new ol.style.Style({
    text: new ol.style.Text({
      text: '', fill: fill, stroke: stroke
    })
  });
  let iconCache = {};
  function getIcon(iconName) {
    let icon = iconCache[iconName];
    if (!icon) {
      icon = new ol.style.Style({
        image: new ol.style.Icon({
          src: 'https://cdn.rawgit.com/mapbox/maki/master/icons/' + iconName + '-15.svg',
          imgSize: [15, 15]
        })
      });
      iconCache[iconName] = icon;
    }
    return icon;
  }

  return function (feature, resolution) {
    let styles = [];
    let length = 0;
    let layer = feature.get('layer');
    let cls = feature.get('class');
    let type = feature.get('type');
    let geom = feature.getGeometry().getType();
    if (_styleLayers[layer]) {
      let style = _styleLayers[layer];
      if (style.type === 'fill') {
        fill.setColor(hslToHex(style.paint['fill-color']));
        styles[length++] = polygon;
      }
      else if (style.type === 'line') {
        stroke.setColor(style.paint['line-color']);
        stroke.setWidth(style.paint['line-width']);

        if (layer === 'HANHCHINH_TINH') {
          let label = feature.get('DIADANH')
          text.getText().setText(feature.get('DIADANH'));
          line.text_ = new ol.style.Text({
            text: label.toUpperCase(),
            textAlign: 'center',
            font: '13px,Noto Sans',
            scale: 1.5,
            // fill: new ol.style.Fill({ color: 'gray' }),
            stroke: new ol.style.Stroke({ color: 'gray', width: 1 })
          });
        } 
        else if (layer === 'HANHCHINH_HUYEN'||layer === 'HANHCHINH_XA') {
          let label = feature.get('diaDanh')
          text.getText().setText(feature.get('diaDanh'));
          line.text_ = new ol.style.Text({
            text: label.toUpperCase(),
            textAlign: 'center',
            font: '13px,Noto Sans',
            scale: 1.5,
            // fill: new ol.style.Fill({ color: 'gray' }),
            stroke: new ol.style.Stroke({ color: 'gray', width: 1 })
          });
        }
        styles[length++] = line;
      }
      else if (style.type === 'symbol') {
        const textField = style.layout['text-field'];
        let label = feature.get(textField)
          text.getText().setText(feature.get(textField));
          text.getText().setScale(1.2);
          text.getText().setStroke(new ol.style.Stroke({ color: 'gray', width: 1 }));
          text.getText().setFill(new ol.style.Fill({ color: 'gray' }));
          styles[length++] = text;
      }
      else {
        console.log(style.type)
      }
    }
    else {
      fill.setColor('#d8e8c8');
      stroke.setColor('#a0c8f0');
      stroke.setWidth(1);
      styles[length++] = polygon;
      styles.length = length;
    }
    // console.log('style', styles);
    return styles;
  }
}



