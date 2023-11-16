import { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from '@components/atoms';

import Location from '@constants/icon/location.svg';

const meta: Meta<typeof ButtonIcon> = {
  title: 'atoms/Button/Icon',
  component: ButtonIcon,
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Preview: Story = {
  args: {
    text: 'location',
    icon: Location,
  },
};
