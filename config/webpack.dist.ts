import * as path from "path";
import {opti} from "./webpack.optimizer";
import webpack from "webpack";
import {rules} from "./webpack.rules";
import {Entry} from "webpack";
import {Kore} from "@kirinnee/core";

let core = new Kore();
core.ExtendPrimitives();

let entry:Entry = {
    "netdeploy": "./src/netdeploy.ts"
};


function GenerateConfig(entry: Entry, filename: string, mode: "development"|"production"|"none") : webpack.Configuration {
    let outDir = path.resolve(__dirname,  "../dist");
    let config : webpack.Configuration = {
        entry: entry,
        output: {
            path: outDir,
            filename: filename,
            libraryTarget: "umd",
            globalObject: "(typeof window !== 'undefined' ? window : this)"
        },
	    resolve: {
		    extensions: ['.ts', '.tsx', '.js']
	    },
        mode: mode,
        devtool: "source-map", 
        module: {rules: rules},
	    target:"node",
	    node: {__dirname: false, __filename: false}
    };
	if (mode === "production") config.optimization = opti;
    return config;
}


module.exports = [
    GenerateConfig(entry, '[name].min.js', 'production'),
    GenerateConfig(entry, '[name].js', 'development')
];