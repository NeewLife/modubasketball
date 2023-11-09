import { Meta, StoryObj } from '@storybook/react';
import { Input } from '@components/atoms';

const meta: Meta<typeof Input> = {
  title: 'atoms/Input',
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Preview: Story = {
  args: {
    text: '',
  },
  argTypes: {
    onTrackable: {
      table: {
        disable: true,
      },
    },
  },
};
