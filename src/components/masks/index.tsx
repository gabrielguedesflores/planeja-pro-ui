// @ts-ignore
import Currency from 'react-currency-input';
import InputMask from 'react-input-mask';
import NumberFormatTP from 'react-number-format';
import IntlCurrencyInput from 'react-intl-currency-input';

export function CPFMask(props: any) {
  return <InputMask {...props} mask='999.999.999-99' maskChar='' />;
}

export function CNPJMask(props: any) {
  return <InputMask {...props} mask='99.999.999/9999-99' maskChar='' />;
}

export function CelularMask(props: any) {
  return <InputMask {...props} mask='(99) 99999-9999' maskChar='' />;
}

interface NumberFormatProps {
  inputRef: (instance: NumberFormatTP<any> | null) => void;
  onChange: (event: {
    target: { value: string; formattedValue: string; name?: string | null };
    persist: any;
  }) => void;
  name?: string | null;
}

export function NumberFormat(props: NumberFormatProps) {
  const { inputRef, onChange, name, ...other } = props;

  return (
    <NumberFormatTP
      {...other}
      getInputRef={inputRef}
      onValueChange={(values: any) => {
        onChange({
          persist: () => null,
          target: {
            value: values.formattedValue,
            formattedValue: values.formattedValue,
            name,
          },
        });
      }}
      thousandSeparator='.'
      decimalScale={2}
      decimalSeparator=','
      prefix='R$ '
      allowNegative={false}
    />
  );
}

interface CurrencyInputProps {
  inputRef: (instance: Currency | null) => void;
  onChange: (event: {
    target: { value: string; maskedValue: string; name?: string | null };
    persist: any;
  }) => void;
  name?: string | null;
}

const currencyConfig = {
  locale: 'pt-BR' as any,
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

export function CurrencyInput(props: CurrencyInputProps) {
  const { inputRef, onChange, name, ...other } = props;
  return (
    <IntlCurrencyInput
      currency='BRL'
      config={currencyConfig}
      {...other}
      defaultValue={0}
      max={1000000}
      onChange={(maskedValue: any, value: any) => {
        onChange({
          persist: () => null,
          target: {
            value: value,
            name: name,
            maskedValue: maskedValue,
          },
        });
      }}
    />
  );
}
