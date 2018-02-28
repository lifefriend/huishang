/***
 * @class ngMap: 地图加载页面
 * <ng-ol-map map="map"></ng-ol-map>  
 */
define(['app', 'ol','config'], function (app, ol,config) {
  return app.directive('ngOlMap', function () {
    return {
      restrict: 'E',
      scope: {
        map: "="
      },
      template: '<div id="olMap" style="width: 100%;height: 100%"></div>',
      replace: true,
      link: function ($scope) {
        $scope.map = $scope.map || {};
        $scope.map.getMap = function () {
          return map;
        };
        var gisconfig = config.gisconfig;
        var center = gisconfig.center;
        var zoom = gisconfig.zoom;
        var minZoom = gisconfig.minZoom;
        var maxZoom = gisconfig.maxZoom;
        var vec_w_url = gisconfig.vec_w;
        var cva_w_url = gisconfig.cva_w;
        var vec_w = new ol.layer.Tile({
          title: "天地图路网",
          source: new ol.source.XYZ({
            crossOrigin: 'anonymous',
            url: vec_w_url
          }),
          visible: true
        });
        var cva_w = new ol.layer.Tile({
          title: "天地图路网文字标注",
          source: new ol.source.XYZ({
            crossOrigin: 'anonymous',
            url: cva_w_url
          }),
          visible: true
        });
        var map = new ol.Map({
          interactions: ol.interaction.defaults({ doubleClickZoom: true ,pinchRotate:false}),
          layers: [vec_w, cva_w],
          target: 'olMap',
          view: new ol.View({
              center: center,
              projection: 'EPSG:4326',
              zoom: zoom,
              minZoom: minZoom,
              maxZoom: maxZoom
          })
      });
      }
    };
  });
});