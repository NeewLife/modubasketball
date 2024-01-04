import { Meta, StoryObj } from '@storybook/react';
import { ImageGroup } from '@components/molecules';

const meta: Meta<typeof ImageGroup> = {
  title: 'molecules/ImageGroup',
  component: ImageGroup,
};

export default meta;
type Story = StoryObj<typeof ImageGroup>;

export const Preview: Story = {
  args: {},
};
