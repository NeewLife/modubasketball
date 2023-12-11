import { Meta, StoryObj } from '@storybook/react';
import { TimeInput } from '@components/organisms';

const meta: Meta<typeof TimeInput> = {
  title: 'organisms/TimeInput',
  component: TimeInput,
};

export default meta;
type Story = StoryObj<typeof TimeInput>;

export const Preview: Story = {
  args: {},
};
