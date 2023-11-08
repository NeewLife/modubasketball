import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@components/atoms';

const meta: Meta<typeof Textarea> = {
  title: 'atoms/Textarea',
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Preview: Story = {
  args: {
    rows: 3,
    text: '최대 3줄까지 쓸 수 있어요.',
  },
  argTypes: {
    onTrackable: {
      table: {
        disable: true,
      },
    },
  },
};
