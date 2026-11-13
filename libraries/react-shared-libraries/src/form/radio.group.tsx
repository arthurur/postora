'use client';

import { FC } from 'react';
import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';
import { TranslatedLabel } from '../translation/translated-label';

export const RadioGroup: FC<{
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  disabled?: boolean;
  hideErrors?: boolean;
  translationKey?: string;
  translationParams?: Record<string, string | number>;
}> = (props) => {
  const {
    label,
    name,
    options,
    disabled,
    hideErrors,
    translationKey,
    translationParams,
  } = props;
  const form = useFormContext();
  const selected = form.watch(name);
  const err = form?.formState?.errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="text-[14px]">
        <TranslatedLabel
          label={label}
          translationKey={translationKey}
          translationParams={translationParams}
        />
      </div>
      <div role="radiogroup" className="flex flex-col gap-[4px]">
        {options.map((option) => {
          const isDisabled = disabled || option.disabled;
          const isSelected = selected === option.value;
          return (
            <label
              key={option.value}
              className={clsx(
                'flex items-center gap-[10px] min-h-[38px] px-[12px] py-[6px] rounded-[8px] border transition-colors',
                isSelected
                  ? 'border-btnPrimary bg-[#612bd3]/[0.14]'
                  : err
                  ? 'border-red-400/50 bg-newBgColorInner'
                  : 'border-newTableBorder bg-newBgColorInner',
                isDisabled
                  ? 'opacity-40 cursor-not-allowed'
                  : clsx('cursor-pointer', !isSelected && 'hover:border-newSep'),
                'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-btnPrimary has-[:focus-visible]:outline-offset-2'
              )}
            >
              <input
                type="radio"
                className="sr-only"
                value={option.value}
                disabled={isDisabled}
                {...form.register(name)}
              />
              <div
                className={clsx(
                  'w-[16px] h-[16px] rounded-full border-2 shrink-0 flex items-center justify-center',
                  isSelected ? 'border-btnPrimary' : 'border-newSep'
                )}
              >
                {isSelected && (
                  <div className="w-[6px] h-[6px] rounded-full bg-btnPrimary" />
                )}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-[6px] min-w-0">
                <div className="text-[14px]">{option.label}</div>
                {!!option.description && (
                  <div className="text-[12px] text-textItemBlur">
                    {option.description}
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {!hideErrors && (
        <div className="text-red-400 text-[12px]">{err || <>&nbsp;</>}</div>
      )}
    </div>
  );
};
