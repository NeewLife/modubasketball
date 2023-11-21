import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Typography,
  Display as SDisplay,
  Headline as SHeadline,
  Title as STitle,
  Body as SBody,
  Caption as SCaption,
} from '@components/atoms';

const meta: Meta<typeof Typography> = {
  title: 'atoms/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Preview: Story = {
  argTypes: {
    format: {
      table: {
        disable: true,
      },
    },
    color: {
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
    <div className="flex flex-col gap-2">
      <SDisplay text="야외 농구코트" />
      <SHeadline type="main" text="내 주변에 있는 농구코트" />
      <SHeadline type="sub" text="농구코트의 위치와 상세 정보" />
      <STitle type="main" text="농구 애호가" />
      <STitle type="mainSmall" text="농구 애호가" />
      <STitle type="sub" text="우리 동네 농구코트" />
      <SBody text="야외 농구코트" />
      <SBody type="sub" text="야외 농구코트" />
      <SCaption text="상세 정보 표기" />
    </div>
  ),
};

export const Display: Story = {
  args: {
    format: 'display',
    text: '야외 농구코트',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const Headline: Story = {
  args: {
    format: 'headline',
    text: '내 주변에 있는 농구코트',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const HeadlineSmall: Story = {
  args: {
    format: 'headlineSmall',
    text: '농구코트의 위치와 상세 정보',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const Title: Story = {
  args: {
    format: 'title',
    text: '농구 애호가',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const SmallTitle: Story = {
  args: {
    format: 'smallTitle',
    text: '농구 애호가',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const SubTitle: Story = {
  args: {
    format: 'subTitle',
    text: '우리 동네 농구코트',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const Body: Story = {
  args: {
    format: 'body',
    text: '야외 농구코트',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const SubBody: Story = {
  args: {
    format: 'subBody',
    text: '야외 농구코트',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const Caption: Story = {
  args: {
    format: 'caption',
    text: '상세 정보 표기',
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};
