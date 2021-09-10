module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'module-resolver',
      {
        'alias': {
          '@services': './src/services',
          '@store': './src/store',
        }
      }
    ]
  ]
}
