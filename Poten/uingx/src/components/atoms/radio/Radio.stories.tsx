import { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@components/atoms';

const meta: Meta<typeof Radio> = {
  title: 'atoms/Radio',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Preview: Story = {
  args: {
    check: true,
    text: '무료',
  },
};
