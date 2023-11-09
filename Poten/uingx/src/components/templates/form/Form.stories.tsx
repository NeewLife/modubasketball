import { Meta, StoryObj } from '@storybook/react';
import { Form } from '@components/templates';

const meta: Meta<typeof Form> = {
  title: 'templates/Form',
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Preview: Story = {
  args: {
    data: [
      {
        label: '코트 종류',
        type: 'input',
        prop: {
          text: '4',
          disabled: true,
        },
      },
      {
        label: '코트 사이즈',
        type: 'input',
        prop: {
          text: '풀코트',
          disabled: true,
        },
      },
      {
        label: '골대 수',
        type: 'input',
        prop: {
          text: '4',
          type: 'number',
          disabled: true,
        },
      },
      {
        label: '사용료',
        type: 'radio',
        prop: {
          data: [
            {
              id: '1',
              check: true,
              text: '무료',
            },
            {
              id: '2',
              check: false,
              text: '유료',
            },
          ],
          disabled: true,
        },
      },
      {
        label: '주차 여부',
        type: 'radio',
        prop: {
          data: [
            {
              id: '1',
              check: true,
              text: '가능',
            },
            {
              id: '2',
              check: false,
              text: '불가능',
            },
          ],
          disabled: true,
        },
      },
      {
        label: '기타 정보',
        type: 'textarea',
        prop: {
          text: '최대 3줄까지 쓸 수 있어요.',
          disabled: true,
          rows: 3,
        },
      },
    ],
  },
};
