require.config({
  paths: {
    "run_stateCtrl": "controllers/run_stateCtrl",
    "map_stateCtrl": "controllers/map_stateCtrl",
  }
});
require(['run_stateCtrl','map_stateCtrl']);