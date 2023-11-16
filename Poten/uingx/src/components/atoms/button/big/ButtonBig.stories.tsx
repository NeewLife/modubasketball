import { Meta, StoryObj } from '@storybook/react';
import { ButtonBig } from '@components/atoms';

const meta: Meta<typeof ButtonBig> = {
  title: 'atoms/Button/Big',
  component: ButtonBig,
};

export default meta;
type Story = StoryObj<typeof ButtonBig>;

export const Preview: Story = {
  args: {
    text: '저장하기',
    size: 'big',
    background: 'secondary',
    color: 'white',
  },
};
