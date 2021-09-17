module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'module-resolver',
      {
        'alias': {
          // '@': './src',
          '@containers': './src/components/containers',
        }
      }
    ]
  ]
}
