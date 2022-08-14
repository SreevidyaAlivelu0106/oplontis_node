window.addEventListener('DOMContentLoaded', function() {
      var canvas = document.getElementById("renderCanvas");

      var startRenderLoop = function (engine, canvas) {
          engine.runRenderLoop(function () {
              if (sceneToRender && sceneToRender.activeCamera) {
                  //console.log("test")
                  sceneToRender.render();

              }
          });
      }

      var engine = null;
      var scene = null;
      var sceneToRender = null;
      var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
      var createScene = function () {

        const scene = new BABYLON.Scene(engine);

        var building = BABYLON.SceneLoader.Append("./", "west_villa_tex_1.glb", scene, function (meshes) {
            scene.createDefaultCameraOrLight(true, true, true);
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

            });
          return scene;

      };

          window.initFunction = async function() {
                  var asyncEngineCreation = async function() {
                      try {
                      return createDefaultEngine();
                      } catch(e) {
                      console.log("the available createEngine function failed. Creating the default engine instead");
                      return createDefaultEngine();
                      }
                  }

            window.engine = await asyncEngineCreation();
            if (!engine) throw 'engine should not be null.';
            startRenderLoop(engine, canvas)
            window.scene = createScene()
       }

      initFunction().then(() => {
        sceneToRender = scene
      });

      // Resize
      window.addEventListener("resize", function () {
          engine.resize();
      });


    function set_camera(x, y, z,){

      var freeCamera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(x, y, z), scene);
              //Attach camera to canvas inputs
              scene.activeCamera = freeCamera;
              freeCamera.attachControl(canvas);
              freeCamera.rotation.y = 1.0;
              console.log("button clicked")
              document.getElementById("text1").innerHTML = "The history of archaeology in the Oplontis area dates back to late sixteenth century, when the tract of the Sarno Canal cut through several areas of archaeological importance, including Pompeii and Oplontis Villa A. In the 1830s, with the hope of discovering statuary for their palaces, the restored Bourbon monarchs underwent a campaign of tunneling through parts of Villa A.";

    }

      function whole_view() {
        scene.createDefaultCameraOrLight(true, true, true);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

              console.log("button clicked")
              document.getElementById("text1").innerHTML = "The mission of the Oplontis Project is to conduct a systematic, multidisciplinary study of Villa A (“of Poppaea”) and Villa B (“of Lucius Crassius Tertius”) at Oplontis (Torre Annunziata, Italy).";
          }

      function goFullscreen(id) {
        var element = document.getElementById(id);
        if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        }

        document.getElementById(id).requestFullscreen();
      }
});
