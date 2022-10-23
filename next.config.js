const withPWA = require('next-pwa')({
  dest: 'public',
  swSrc: 'sw-offline.js',
})

module.exports = withPWA({
  // next.js config
})