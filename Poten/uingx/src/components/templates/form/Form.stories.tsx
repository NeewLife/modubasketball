import { Meta, StoryObj } from '@storybook/react';
import { Form } from '@components/templates';

const meta: Meta<typeof Form> = {
  title: 'templates/Form',
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Preview: Story = {
  args: {},
};
