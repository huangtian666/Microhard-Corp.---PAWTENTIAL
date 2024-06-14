/*Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig, getDefaultConfig } = require('expo/metro-config');

const getDefaultConfig = getDefaultConfig(__dirname);
getDefaultConfig.resolver.assetExts.push('cjs');

/* @type {import('expo/metro-config').MetroConfig} 
//const config = getDefaultConfig(__dirname);

module.exports = config;*/

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

/* @type {import('expo/metro-config').MetroConfig} */
const config = defaultConfig;

module.exports = config; 

