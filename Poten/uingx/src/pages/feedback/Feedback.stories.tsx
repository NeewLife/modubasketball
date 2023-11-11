import { Meta, StoryObj } from '@storybook/react';
import { Feedback } from '@pages/index';

const meta: Meta<typeof Feedback> = {
  title: 'pages/Feedback',
  component: Feedback,
};

export default meta;
type Story = StoryObj<typeof Feedback>;

export const Preview: Story = {
  args: {},
};
