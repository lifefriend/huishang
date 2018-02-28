define([], function() {
  var gisconfig = {
    //地图中心点
    center: [0, 0],
    zoom: 10,
    minZoom: 8,
    maxZoom: 18,
    //天地图路网
    vec_w: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}",
    //天地图路网文字标注
    cva_w: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}",
    //天地图卫星影像
    img_w: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}",
    //天地图卫星影像文字标注
    cia_w: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}",
    //天地图路网(离线)
    vec_w_f: "data/vec_w/{z}/{x}/{y}.png",
    //天地图路网文字标注(离线)
    cva_w_f: "data/cva_w/{z}/{x}/{y}.png",
    //天地图卫星影像(离线)
    img_w_f: "data/img_w/{z}/{x}/{y}.png",
    //天地图卫星影像文字标注(离线)
    cia_w_f: "data/cia_w/{z}/{x}/{y}.png"
  };
  var appconfig = {};
  return { gisconfig: gisconfig, appconfig: appconfig };
});
