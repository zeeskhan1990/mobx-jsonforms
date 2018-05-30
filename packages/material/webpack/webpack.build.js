const merge = require('webpack-merge');
const baseConfig = require('../../../webpack/webpack.build.base.js');

module.exports = merge(baseConfig, {
    output: {
        filename: "jsonforms-material.js",
        library: "JSONFormsMaterial"
    },
    externals: {
        '@mobx-jsonforms/core': 'JSONFormsCore',
        '@mobx-jsonforms/webcomponent': 'JSONFormsWebcomponent'
    },
});