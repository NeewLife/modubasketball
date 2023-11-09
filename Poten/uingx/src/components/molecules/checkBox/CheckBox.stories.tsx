import { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from '@components/molecules';

const meta: Meta<typeof CheckBox> = {
  title: 'molecules/CheckBox',
  component: CheckBox,
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Preview: Story = {
  args: {
    text: '아스팔트',
    check: true,
    rounded: 'all',
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    onTrackable: {
      table: {
        disable: true,
      },
    },
  },
};
