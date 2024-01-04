import { Meta, StoryObj } from '@storybook/react';
import { NickName } from '@pages/index';

const meta: Meta<typeof NickName> = {
  title: 'pages/NickName',
  component: NickName,
};

export default meta;
type Story = StoryObj<typeof NickName>;

export const Preview: Story = {
  args: {},
};
