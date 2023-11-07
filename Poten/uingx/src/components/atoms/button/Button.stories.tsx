import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonBig, ButtonIcon, ButtonLong, ButtonMedium } from '@components/atoms';

import Location from '@constants/icon/location.svg';

const meta: Meta<typeof Button> = {
  title: 'atoms/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Preview: Story = {
  argTypes: {
    format: {
      table: {
        disable: true,
      },
    },
    text: {
      table: {
        disable: true,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <ButtonBig text="취소하기" background="gray" />
        <ButtonBig text="저장하기" background="secondary" />
      </div>
      <div className="flex gap-3">
        <ButtonMedium text="농구장 제보하기" />
        <ButtonIcon text="location" icon={Location} />
      </div>
      <div>
        <ButtonLong text="내 주변 농구장 찾기" />
      </div>
    </div>
  ),
};

export const Big: Story = {
  args: {
    format: 'big',
    text: '저장하기',
  },
};

export const Icon: Story = {
  args: {
    format: 'icon',
    text: 'location',
  },
};

export const Long: Story = {
  args: {
    format: 'long',
    text: '내 주변 농구장 찾기',
  },
};

export const Medium: Story = {
  args: {
    format: 'medium',
    text: '농구장 제보하기',
  },
};
