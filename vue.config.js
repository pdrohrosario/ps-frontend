const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    devserver: {
        proxy: 'https://localhost:3000',
        
    }
  })
