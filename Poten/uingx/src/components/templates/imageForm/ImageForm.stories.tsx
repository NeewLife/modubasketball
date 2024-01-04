import { Meta, StoryObj } from '@storybook/react';
import { ImageForm } from '@components/templates';

const meta: Meta<typeof ImageForm> = {
  title: 'templates/ImageForm',
  component: ImageForm,
};

export default meta;
type Story = StoryObj<typeof ImageForm>;

export const Preview: Story = {
  args: {},
};
