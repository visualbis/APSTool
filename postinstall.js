"use strict";var _require=require("child_process"),exec=_require.exec,path=require("path");"production"!==process.env.NODE_ENV&&require("dotenv").load();var authToken=process.env.gitToken;exec("git clone --depth 1 https://"+authToken+"@github.com/vbxdesignstudio/VBI_DX_Suite.git -b aps-tool",{cwd:path.join(__dirname,"./")},function(e,o,t){e?console.error("exec error: "+e):(console.log("stdout: "+o),console.log("stderr: "+t),exec("git remote add upstream https://"+authToken+"@github.com/visualbis/VBI_DX_Suite.git",{cwd:path.join(__dirname,"./VBI_DX_Suite")},function(e,o,t){e?console.error("exec error: "+e):(console.log("stdout: "+o),console.log("stderr: "+t),exec("git clone --depth 1 https://"+authToken+"@github.com/vbxdesignstudio/PowerBI.git -b aps-tool",{cwd:path.join(__dirname,"./")},function(e,o,t){e?console.error("exec error: "+e):(console.log("stdout: "+o),console.log("stderr: "+t),exec("git remote add upstream https://"+authToken+"@github.com/visualbis/PowerBI.git",{cwd:path.join(__dirname,"./PowerBI")},function(e,o,t){e?console.error("exec error: "+e):(console.log("stdout: "+o),console.log("stderr: "+t))}))}))}))});