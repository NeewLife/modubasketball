import { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '@components/molecules';

const meta: Meta<typeof SearchBar> = {
  title: 'molecules/SearchBar',
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Preview: Story = {
  args: {
    text: '',
  },
  argTypes: {
    onTrackable: {
      table: {
        disable: true,
      },
    },
  },
};
