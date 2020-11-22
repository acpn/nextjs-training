const { isExternalModuleNameRelative } = require("typescript")

module.exports = {
  presets: ["next/babel"],
  plugins: [["styled-components", { "ssr": true }]]
}
