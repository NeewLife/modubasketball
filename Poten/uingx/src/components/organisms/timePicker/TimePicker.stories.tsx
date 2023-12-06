import { Meta, StoryObj } from '@storybook/react';
import { TiemPicker } from '@components/organisms';

const meta: Meta<typeof TiemPicker> = {
  title: 'organisms/TimePicker',
  component: TiemPicker,
};

export default meta;
type Story = StoryObj<typeof TiemPicker>;

export const Preview: Story = {
  args: {},
};
