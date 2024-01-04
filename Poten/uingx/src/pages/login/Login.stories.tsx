import { Meta, StoryObj } from '@storybook/react';
import { Login } from '@pages/index';

const meta: Meta<typeof Login> = {
  title: 'pages/Login',
  component: Login,
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Preview: Story = {
  args: {},
};
