import tsJest from "ts-jest";

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

	transform: {
		...tsjPreset.transform,
	},
	testMatch: ["**/?(*.)+(spec|test).ts"],
};
