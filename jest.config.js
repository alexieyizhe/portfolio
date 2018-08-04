module.exports = {
    verbose: true,
    testURL: "http://localhost/",
    testMatch: [
      "**/?(*.)+(spec|test).js?(x)"
    ],
    setupFiles: [
      "./.jest/env-setup.js"
    ],
    setupTestFrameworkScriptFile: "./.jest/test-setup.js",
    snapshotSerializers: [
      "enzyme-to-json/serializer"
    ],
    coverageDirectory: "./test/coverage/",
    coveragePathIgnorePatterns: [
      "./node_modules/",
      "./test/",
      "./static/",
      "./.jest/"
    ]
}
