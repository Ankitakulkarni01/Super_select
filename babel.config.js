module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-transform-class-properties', { loose: false }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
  ],
};