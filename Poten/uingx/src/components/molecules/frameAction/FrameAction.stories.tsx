import { Meta, StoryObj } from '@storybook/react';
import { FrameAction } from '@components/molecules';

const meta: Meta<typeof FrameAction> = {
  title: 'molecules/FrameAction',
  component: FrameAction,
};

export default meta;
type Story = StoryObj<typeof FrameAction>;

export const Preview: Story = {
  args: {
    data: ['00', '01', '02', '03'],
    swiping: true,
  },
};
