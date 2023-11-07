import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '@components/molecules';

const meta: Meta<typeof RadioGroup> = {
  title: 'molecules/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Preview: Story = {
  args: {},
};
