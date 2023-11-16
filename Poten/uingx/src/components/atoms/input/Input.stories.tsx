import { Meta, StoryObj } from '@storybook/react';
import { Input } from '@components/atoms';

const meta: Meta<typeof Input> = {
  title: 'atoms/Input',
  component: Input,
  argTypes: {
    onTrackable: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Preview: Story = {
  args: {
    text: '',
  },
};

export const Regex: Story = {
  args: {
    text: '1234',
    regex: {
      regex: /[a-z]/,
      message: '정규표현식에 맞지 않음',
    },
  },
};
