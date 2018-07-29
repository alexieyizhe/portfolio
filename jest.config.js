module.exports = {
    verbose: true,
    testURL: "http://localhost/",
    testMatch: [
      "**/?(*.)+(spec|test).js?(x)"
    ],
    collectCoverage: true,
    setupFiles: [
      "./jest_setup.js"
    ],
    snapshotSerializers: [
      "enzyme-to-json/serializer"
    ],
    coverageDirectory: "./test/coverage/",
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/test/",
      "/static/",
      "jest_setup.js"
    ]
}
