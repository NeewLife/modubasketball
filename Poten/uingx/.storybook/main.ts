import type { StorybookConfig } from '@storybook/react-webpack5';

const path = require('path');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-interactions',
    'storybook-addon-react-router-v6',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['..\\public'],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@components': path.resolve(__dirname, '../src/components'),
          '@constants': path.resolve(__dirname, '../src/constants'),
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@services': path.resolve(__dirname, '../src/services'),
          '@utils': path.resolve(__dirname, '../src/utils'),
        },
      },
    };
  },
};
export default config;
