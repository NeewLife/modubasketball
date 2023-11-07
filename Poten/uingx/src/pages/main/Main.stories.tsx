import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Main } from '@pages/index';
import { useKeyword } from '@utils/zustand';

const meta: Meta<typeof Main> = {
  title: 'pages/Main',
  component: Main,
};

export default meta;
type Story = StoryObj<typeof Main>;

export const Search: Story = {
  render: () => {
    useKeyword.setState(() => ({ type: 'search', keyword: '마포구' }));

    return <Main />;
  },
};

export const Gps: Story = {
  render: () => {
    useKeyword.setState(() => ({ type: 'gps', keyword: '' }));

    return <Main />;
  },
};
