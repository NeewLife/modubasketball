import { Meta, StoryObj } from '@storybook/react';
import { Map } from '@components/atoms';

const meta: Meta<typeof Map> = {
  title: 'atoms/Map',
  component: Map,
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Preview: Story = {
  args: {
    level: 3,
    center: [33.450701, 126.570667],
  },
};
