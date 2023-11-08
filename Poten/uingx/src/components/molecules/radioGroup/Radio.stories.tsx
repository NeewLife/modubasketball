import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '@components/molecules';

const meta: Meta<typeof RadioGroup> = {
  title: 'molecules/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Preview: Story = {
  args: {
    data: [
      {
        id: '1',
        text: '무료',
        check: true,
      },
      {
        id: '2',
        text: '유료',
        check: false,
      },
    ],
  },
};
