const path = require('path')

module.exports = {
    src: path.join(process.cwd(), 'src'),
    dev: path.join(process.cwd(), 'src/index.js'),
    build: path.join(process.cwd(), 'build'),
    lib: path.join(process.cwd(), 'node_modules')
}
