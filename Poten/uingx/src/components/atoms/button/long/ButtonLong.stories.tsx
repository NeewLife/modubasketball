import { Meta, StoryObj } from '@storybook/react';
import { ButtonLong } from '@components/atoms';

const meta: Meta<typeof ButtonLong> = {
  title: 'atoms/Button/ButtonLong',
  component: ButtonLong,
};

export default meta;
type Story = StoryObj<typeof ButtonLong>;

export const Preview: Story = {
  args: {
    text: '내 주변 농구장 찾기',
  },
};
