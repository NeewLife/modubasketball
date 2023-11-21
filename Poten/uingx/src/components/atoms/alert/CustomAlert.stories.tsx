import { Meta, StoryObj } from '@storybook/react';
import { CustomAlert } from '@components/atoms';

import Error from '@constants/icon/error.svg';

const meta: Meta<typeof CustomAlert> = {
  title: 'atoms/CustomAlert',
  component: CustomAlert,
};

export default meta;
type Story = StoryObj<typeof CustomAlert>;

export const Preview: Story = {
  args: {
    text: '위치를 지원할수 없는 곳입니다.',
    icon: Error,
  },
};
