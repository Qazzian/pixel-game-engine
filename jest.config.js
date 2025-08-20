// import {createDefaultEsmPreset} from "ts-jest";
// const defaultEsmPreset = createDefaultEsmPreset();
import esmResolver from "./tests/esm-resolver.js";

/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
	testEnvironment: "node",
	"moduleNameMapper": {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	"extensionsToTreatAsEsm": [".ts"],
	"transform": {
		"^.+\\.(mt|t|cj|j)s$": [
			"ts-jest",
			{
				"useESM": true
			}
		]
	},
};
