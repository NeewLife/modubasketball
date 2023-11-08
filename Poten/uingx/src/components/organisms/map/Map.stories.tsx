import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Map } from '@components/organisms';

const meta: Meta<typeof Map> = {
  title: 'organisms/Map',
  component: Map,
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Preview: Story = {
  render: () => (
    <div className="h-screen">
      <Map keyword="" type="gps" />
    </div>
  ),
};
