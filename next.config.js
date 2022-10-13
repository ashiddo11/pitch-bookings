const withPWA = require('next-pwa')({
  dest: 'public',
  swSrc: 'public/sw-offline.js',
})

module.exports = withPWA({
  // next.js config
})