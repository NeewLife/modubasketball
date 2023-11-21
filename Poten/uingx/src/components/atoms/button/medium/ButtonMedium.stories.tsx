import { Meta, StoryObj } from '@storybook/react';
import { ButtonMedium } from '@components/atoms';

const meta: Meta<typeof ButtonMedium> = {
  title: 'atoms/Button/ButtonMedium',
  component: ButtonMedium,
};

export default meta;
type Story = StoryObj<typeof ButtonMedium>;

export const Preview: Story = {
  args: {
    text: '농구장 제보하기',
  },
};
