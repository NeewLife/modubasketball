import { Meta, StoryObj } from '@storybook/react';
import { Image } from '@components/atoms';

const meta: Meta<typeof Image> = {
  title: 'atoms/Image',
  component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Preview: Story = {
  args: {},
};
