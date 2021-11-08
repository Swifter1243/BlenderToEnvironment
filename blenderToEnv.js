const trackName = "environment";
const mapFile = "ExpertPlusStandard.dat"
// You can drag the SW EXE into the map folder to easily reference the file (as shown above) or if you're a lazy fuck you can copy and paste the whole path like an idiot

const fs = require("fs");
const three = require("three");
let map = JSON.parse(fs.readFileSync(mapFile));
const pillarToNoodleUnits = 0.1495;

/*
Made by Swifter

For this to work, I would recommend my setup of having ExpertPlusStandard or whatever be the output of SW, and then adding ExpertPlusStandard_Old or whatever to the
info.dat somehow so you can access it in CM for mapping/lighting stuff. (Remember CM/SW will overwrite info.dat so you will need to close those if you wanna update it)

In order to get this script working, you will first need to open your terminal in VSC, and make sure you're in the map directory.
You can get to the directory by using 'cd "[insert directory here]"' E.X: 'cd "C:\Program Files (x86)\Steam\steamapps\common\Beat Saber\Beat Saber_Data\CustomWIPLevels\Joe Nuts"`
After that type "npm install three". This is a dependancy since I'm too stupid to do my own math

And then, you will need to setup SW. Make sure your .dae follows the SW docs: https://github.com/thelightdesigner/ScuffedWalls/blob/main/Blender%20Project.md

Add the following to your SW script:

0:Run
  javascript: Name of script file here. (E.G. javascript:script.js)
  runbefore: false
  refreshonsave: true

0:ModelToWall
  path: Name of model file here. (E.G. path:model.dae)
  track: Name of track here. Must match "trackName" constant from this script. Don't put a space after the colon and don't use quotes
  type:3 

This should run this whole script with node from SW on save of the JS script or the SW script.

Additional info:
- The objects are placed relative to noodle units, so if you were to add another modeltowall string using walls, everything should overlap. (good for debugging if you're adapting the script!)
- Y forward in Blender is the Z forward (the direction notes come from) in Beat Saber

If anything ain't working then DM me :) Swifter#1243

*/

if (!map._customData._environment) map._customData._environment = []

function vectorFromRotation(vectorRot, length) {
    const deg2rad = Math.PI / 180;
    var mathRot = copy(vectorRot);

    mathRot[0] *= deg2rad;
    mathRot[1] *= deg2rad;
    mathRot[2] *= deg2rad;

    var rotVector = new three.Vector3(0, length, 0).applyEuler(new three.Euler(...mathRot, "YXZ"));
    return [rotVector.x, rotVector.y, rotVector.z];
}

function copy(obj) {
    if (typeof obj != 'object') return obj;

    var newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        newObj[key] = copy(obj[key]);
    }
    return newObj
}

map._notes.forEach(x => {
    if (x._customData && x._customData._track == trackName) {
        var y = copy(x);

        var pillarPos = y._customData._animation._definitePosition[0];
        var pillarRot = y._customData._animation._localRotation[0];
        var pillarScale = y._customData._animation._scale[0];

        pillarPos.pop();
        pillarRot.pop();
        pillarScale.pop();

        var offset = vectorFromRotation(pillarRot, pillarScale[1] / 2 * 0.87);

        pillarScale[0] *= pillarToNoodleUnits;
        pillarScale[1] *= pillarToNoodleUnits / 32;
        pillarScale[2] *= pillarToNoodleUnits;

        pillarPos[1] += 0.09;
        pillarPos[2] += 0.65 * (1 / 0.6);

        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];

        map._customData._environment.push({
            _id: "\\]PillarPair \\(1\\)\\.\\[0\\]PillarL\\.\\[0\\]Pillar$",
            _lookupMethod: "Regex",
            _duplicate: 1,
            _position: pillarPos,
            _scale: pillarScale,
            _rotation: pillarRot,
            _track: trackName,
            _active: true
        })
    }
});

map._notes = map._notes.filter(x => !x._customData || (x._customData._track !== trackName));
fs.writeFileSync(mapFile, JSON.stringify(map, null, 0));
