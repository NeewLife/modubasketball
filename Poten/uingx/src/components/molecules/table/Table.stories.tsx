import { Meta, StoryObj } from '@storybook/react';
import { Table } from '@components/molecules';

const meta: Meta<typeof Table> = {
  title: 'molecules/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const onClick = (id: string) => {
  console.log(id);
};

export const Preview: Story = {
  args: {
    columns: [
      {
        id: 'id',
        value: 'id',
        click: false,
      },
      {
        id: 'name',
        value: '이름',
        click: true,
      },
      { id: 'count', value: '요청 수', click: false },
    ],
    data: [
      ['1', '이촌 한강공원 농구장', '1'],
      ['2', '이촌 한강공원 농구장', '3'],
      ['3', '이촌 한강공원 농구장', '3'],
      ['4', '이촌 한강공원 농구장', '3'],
    ],
    callback: onClick,
  },
};
