module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'module-resolver',
      {
        'alias': {
          '@components': './src/components',
          '@services': './src/services',
          '@store': './src/store',
        }
      }
    ]
  ]
}
