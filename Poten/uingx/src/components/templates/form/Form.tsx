import React, { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { RadioGroup, RadioGroupProps } from '@components/molecules';
import { Input, InputProps, Textarea, TextareaProps, Title } from '@components/atoms';
import { CheckBoxGroup, CheckBoxGroupProps } from '@components/organisms';
import { useResize } from '@utils/zustand';

interface IForm {
  type: string;
  label: string;
}

interface IFormRadio extends IForm {
  type: 'radio';
  prop: RadioGroupProps;
}

interface IFormInput extends IForm {
  type: 'input';
  prop: InputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

interface IFormTextarea extends IForm {
  type: 'textarea';
  prop: TextareaProps & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
}

interface IFormCheckBox extends IForm {
  type: 'checkBox';
  prop: CheckBoxGroupProps;
}

export type IFormTypes = IFormRadio | IFormInput | IFormTextarea | IFormCheckBox;

interface FormProps {
  data?: IFormTypes[];
}

export const Form = (props: FormProps) => {
  const { data = [] } = props;

  const resize = useResize();

  return (
    <div className="flex flex-col desktop:gap-[60px] gap-[40px]">
      {data.map(({ label, type, prop }) => (
        <div key={label}>
          <div className="mb-[10px]">
            <Title type={resize.type === 'desktop' ? 'main' : 'mainSmall'} text={label} color="text-secondary-30" />
          </div>
          {type === 'input' && <Input {...prop} />}
          {type === 'checkBox' && <CheckBoxGroup {...prop} />}
          {type === 'radio' && <RadioGroup {...prop} />}
          {type === 'textarea' && <Textarea {...prop} />}
        </div>
      ))}
    </div>
  );
};
