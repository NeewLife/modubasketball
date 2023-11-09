import { Meta, StoryObj } from '@storybook/react';
import { InfoEdit } from '@pages/index';

const meta: Meta<typeof InfoEdit> = {
  title: 'pages/InfoEdit',
  component: InfoEdit,
};

export default meta;
type Story = StoryObj<typeof InfoEdit>;

export const Save: Story = {
  args: {
    address: '서울 영등포구 양원동 33-3',
  },
};

export const Update: Story = {
  args: {
    address: '서울 영등포구 양원동 33-3',
    courtName: '이촌 한강공원 농구장',
    courtType: '아스팔트',
    courtSize: '풀코트',
    goalPost: '4',
    feeYn: '무료',
    parkYn: '가능',
    comment: '최대 3줄까지 쓸 수 있어요.',
  },
};
