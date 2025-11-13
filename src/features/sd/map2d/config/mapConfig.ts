export const TILE_GATE_WAY_URL = "https://qc.c4i.vn";
export const defaultFont = ["'Noto Sans'"];
export const mainRoadUrl = "/layers/duong_chinh.geojson";
export const xaLabelUrl = "/layers/xa_labels.geojson";
export const huyenLabelUrl = "/layers/huyen_labels.geojson";
export const tinhLabelUrl = "/layers/tinh_labels.geojson";
// to do : Add TILE_GATE_WAY_URL
export const ranhgioiUrl = TILE_GATE_WAY_URL + "/tiles/data/ranhgioi/{z}/{x}/{y}.pbf";
export const duongboUrl = TILE_GATE_WAY_URL + "/tiles/data/giaothong_chinh/{z}/{x}/{y}.pbf";
export const duongthuyUrl = TILE_GATE_WAY_URL + "/tiles/data/songsuoia/{z}/{x}/{y}.pbf";
export const hanhChinhXaUrl = TILE_GATE_WAY_URL + "/tiles/data/hanhchinh_xa/{z}/{x}/{y}.pbf";
export const hanhChinhHuyenUrl = TILE_GATE_WAY_URL + "/tiles/data/hanhchinh_huyen/{z}/{x}/{y}.pbf";
export const hanhChinhTinhUrl = TILE_GATE_WAY_URL + "/tiles/data/hanhchinh_tinh/{z}/{x}/{y}.pbf";
export const daoUrl = TILE_GATE_WAY_URL + "/tiles/data/dao/{z}/{x}/{y}.pbf";

// Map style
export const defaultStyle = TILE_GATE_WAY_URL + "/tiles/proxy/style.json?host=" + TILE_GATE_WAY_URL;
export const topoStyle =
     TILE_GATE_WAY_URL + "/tiles/proxy/style_topo.json?host=" + TILE_GATE_WAY_URL;
export const heatmapStyle =
     TILE_GATE_WAY_URL + "/tiles/proxy/style_hm.json?host=" + TILE_GATE_WAY_URL;
export const sateliteStyle =
     TILE_GATE_WAY_URL + "/tiles/proxy/style_stl.json?host=" + TILE_GATE_WAY_URL;
