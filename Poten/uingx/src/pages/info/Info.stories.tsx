import { Meta, StoryObj } from '@storybook/react';
import { Info } from '@pages/index';

const meta: Meta<typeof Info> = {
  title: 'pages/Info',
  component: Info,
};

export default meta;
type Story = StoryObj<typeof Info>;

export const Preview: Story = {
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
