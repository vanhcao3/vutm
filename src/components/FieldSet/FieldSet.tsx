import classNames from 'classnames';
import { ReactNode } from 'react';

export interface FieldSetProps {
  className?: string;
  legend: string | ReactNode;
  children: ReactNode;
}

export const FieldSet = ({ className, legend, children }: FieldSetProps) => {
  return (
    <fieldset className={classNames('FieldSet', className)}>
      <legend className="FieldSet__legend">{legend}</legend>
      {children}
    </fieldset>
  );
};
