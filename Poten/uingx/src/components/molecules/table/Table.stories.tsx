import { Meta, StoryObj } from '@storybook/react';
import { Table } from '@components/molecules';

const meta: Meta<typeof Table> = {
  title: 'molecules/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Preview: Story = {
  args: {
    columns: [
      {
        id: 'name',
        value: '이름',
        callback: () => () => {
          console.log('test');
        },
      },
      { id: 'count', value: '요청 수' },
    ],
    data: [
      ['이촌 한강공원 농구장', '1'],
      ['이촌 한강공원 농구장', '3'],
      ['이촌 한강공원 농구장', '3'],
      ['이촌 한강공원 농구장', '3'],
    ],
  },
};
