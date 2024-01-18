import React, { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { RadioGroup, RadioGroupProps } from '@components/molecules';
import { Body, Input, InputProps, Textarea, TextareaProps, Title } from '@components/atoms';
import { CheckBoxGroup, CheckBoxGroupProps, TimeInput } from '@components/organisms';
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

interface IFormDate extends IForm {
  type: 'date';
  prop: {
    startTime?: {
      type: string;
      time: string;
      onTrackable?: (type: string, time: string) => void;
    };
    endTime?: {
      type: string;
      time: string;
      onTrackable?: (type: string, time: string) => void;
    };
    disabled?: boolean;
    check?: boolean;
    text?: string;
    radio: RadioGroupProps;
  };
}

export type IFormTypes = IFormRadio | IFormInput | IFormTextarea | IFormCheckBox | IFormDate;

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
          {type === 'date' && (
            <div>
              <RadioGroup {...prop.radio} />
              {prop.check && (
                <>
                  <div className="flex gap-[15px] items-center mt-[30px]">
                    <TimeInput
                      isDisabled={prop.disabled}
                      start={prop.startTime}
                      onTrackable={prop.startTime?.onTrackable}
                    />
                    <Title type="sub" text="~" color="text-gray-60" />
                    <TimeInput
                      isDisabled={prop.disabled}
                      start={prop.endTime}
                      onTrackable={prop.endTime?.onTrackable}
                    />
                  </div>
                  <div className="mt-[10px]">
                    <Title
                      type="sub"
                      text={prop.text ?? ''}
                      color="text-gray-60"
                      className="tablet:hidden mobile:hidden"
                    />
                    <Body type="sub" text={prop.text ?? ''} color="text-gray-60" className="desktop:hidden" />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
