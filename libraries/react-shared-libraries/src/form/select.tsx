'use client';

import {
  Children,
  cloneElement,
  DetailedHTMLProps,
  FC,
  forwardRef,
  isValidElement,
  ReactElement,
  SelectHTMLAttributes,
  useMemo,
} from 'react';
import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import {
  getLabelTranslationKey,
  TranslatedLabel,
} from '../translation/translated-label';
import { useT } from '../translation/get.transation.service.client';

export const Select: FC<
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & {
    error?: any;
    extraForm?: RegisterOptions<any>;
    disableForm?: boolean;
    label: string;
    name: string;
    hideErrors?: boolean;
    translationKey?: string;
    translationParams?: Record<string, string | number>;
  }
> = forwardRef((props, ref) => {
  const {
    label,
    className,
    hideErrors,
    disableForm,
    error,
    extraForm,
    translationKey,
    translationParams,
    children,
    ...rest
  } = props;
  const t = useT();
  const form = useFormContext();
  const err = useMemo(() => {
    if (error) return error;
    if (!form || !form.formState.errors[props?.name!]) return;
    return form?.formState?.errors?.[props?.name!]?.message! as string;
  }, [form?.formState?.errors?.[props?.name!]?.message, error]);
  return (
    <div className={clsx('flex flex-col', label ? 'gap-[6px]' : '')}>
      <div className={`text-[14px]`}>
        <TranslatedLabel
          label={label}
          translationKey={translationKey}
          translationParams={translationParams}
        />
      </div>
      <select
        ref={ref}
        {...(disableForm ? {} : form.register(props.name, extraForm))}
        className={clsx(
          'h-[42px] bg-newBgColorInner px-[16px] outline-none border-newTableBorder border rounded-[8px] text-[14px]',
          className
        )}
        {...rest}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child) || child.type !== 'option') {
            return child;
          }

          const option = child as ReactElement<{ children?: unknown }>;
          if (typeof option.props.children !== 'string') {
            return child;
          }

          const optionLabel = option.props.children.trim();
          return cloneElement(
            option,
            undefined,
            t(getLabelTranslationKey(optionLabel), optionLabel)
          );
        })}
      </select>
      {!hideErrors && (
        <div className="text-red-400 text-[12px]">{err || <>&nbsp;</>}</div>
      )}
    </div>
  );
});
