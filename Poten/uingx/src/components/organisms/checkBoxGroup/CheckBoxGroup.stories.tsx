import { Meta, StoryObj } from '@storybook/react';
import { CheckBoxGroup } from '@components/organisms';

const meta: Meta<typeof CheckBoxGroup> = {
  title: 'organisms/CheckBoxGroup',
  component: CheckBoxGroup,
};

export default meta;
type Story = StoryObj<typeof CheckBoxGroup>;

export const Preview: Story = {
  args: {
    data: [
      {
        id: '1',
        text: '아스팔트',
        check: true,
      },
      {
        id: '2',
        text: '우레탄',
        check: false,
      },
      {
        id: '3',
        text: '고무',
        check: false,
      },
      {
        id: '4',
        text: '모레',
        check: false,
      },
      {
        id: '5',
        text: '알수없음',
        check: false,
      },
    ],
  },
};
