import { CircularProgress, FormControl, InputAdornment, InputBaseProps, InputLabel } from '@mui/material';
// import { InputLabel } from '@unicred/uds-core';
import { forwardRef, useMemo } from 'react';
import FadeIn from 'react-fade-in';
import InputMask from 'react-input-mask';
import { ErrorMsg, HelperText, OutlinedInput, AlertText } from './styles';
import { Colors } from '../../assets/theme';
import WarningIcon from '@mui/icons-material/Warning';

interface InputProps extends InputBaseProps {
  label: string;
  loading?: boolean;
  'data-testid'?: string;
  errorMsg?: string;
  textAlign?: 'center' | 'left' | 'right' | 'justify';
  mask?: string;
  maskChar?: string;
  inputComponent?: any;
  money?: boolean;
  help?: string;
}

const InputCurrency = forwardRef((props: InputProps, ref) => {
  const {
    label,
    fullWidth = true,
    margin = '',
    endAdornment,
    disabled,
    loading = false,
    placeholder,
    'data-testid': dataTestId,
    error,
    errorMsg,
    textAlign,
    color,
    mask,
    maskChar,
    money,
    inputComponent,
    help,
    name,
    multiline,
    ...rest
  } = props;

  const loadingAdornment = (
    <InputAdornment variant='outlined' position='end'>
      <CircularProgress size={15} />
    </InputAdornment>
  );

  const inputComponentProp = useMemo(() => {
    if (mask) {
      const _maskChar = maskChar ? maskChar : '';
      return (props: any) => <InputMask maskChar={_maskChar} {...props} mask={mask} />;
    } else {
      return inputComponent;
    }
  }, [mask, inputComponent]);

  return (
    <FormControl disabled={loading || disabled} fullWidth={fullWidth}>
      <InputLabel htmlFor={name} color={color}>
        {label}
      </InputLabel>

      {multiline && (
        <AlertText>
          <WarningIcon style={{ color: Colors.alert, marginRight: 10 }} />
          Por motivos de segurança esse campo não permite os caracteres:{' '}
          <strong
            style={{
              marginLeft: 10,
              fontSize: 14,
              letterSpacing: 12,
              color: Colors.primary,
              fontWeight: 'bold',
            }}
          >
            -'"|,
          </strong>
        </AlertText>
      )}
      <OutlinedInput
        label={label}
        name={name}
        id={name}
        autoComplete='off'
        fullWidth={fullWidth}
        endAdornment={loading ? loadingAdornment : endAdornment}
        placeholder={loading ? 'Carregando...' : placeholder}
        inputProps={{
          'data-testid': dataTestId ?? `field-${name}`,
          ref,
        }}
        error={error}
        inputComponent={inputComponentProp}
        multiline={multiline}
        {...rest}
      />
      {!!error && (
        <FadeIn>
          <ErrorMsg textAlign={textAlign}>{errorMsg}</ErrorMsg>
        </FadeIn>
      )}
      {help && <HelperText>{help}</HelperText>}
    </FormControl>
  );
});

export default InputCurrency;
