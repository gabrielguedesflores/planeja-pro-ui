import isNumeric from 'validator/lib/isNumeric';
import isEmail from 'validator/lib/isEmail';

class FormatUtils {
  private constructor() {}

  static formatBRL(value: number) {
    let parsed: any = null;
    if (value)
      parsed = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    return parsed;
  }

  static formatNumber(value: number) {
    let parsed: any = null;
    if (value) {
      parsed = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
    return parsed;
  }

  static BRLToNumber(value: string) {
    const safeValue = value ? String(value) : '';
    let parsedNumber = 0;
    if (safeValue.length)
      parsedNumber = parseFloat(
        safeValue.split('R$').join('').split('.').join('').replace(',', '.').trim(),
      );
    return parsedNumber;
  }

  static stringWODiacritics(str: string) {
    const normalized = str.normalize('NFD').replace(/[-':"_/\{}[]()]/g, ' ');

    return normalized.replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '');
  }

  static securityNormalize(str: string, space: boolean = true): string {
    if (str && str.length > 0) {
      return str.replace(/[-'"|,]/g, space ? ' ' : '');
    }
    return '';
  }

  static normalizeString(str: string) {
    if (str && str.length > 0) {
      const val = String(str);
      return String(this.stringWODiacritics(val)).toLowerCase().trim();
    }
    return '';
  }

  static formatCelular(str: string): string {
    if (typeof str !== 'string') throw new Error('invalid parameter');

    return str.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  }

  static formatCPF(str: string): string {
    if (typeof str !== 'string') throw new Error('invalid parameter');

    return str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  static formatCNPJ(str: string): string {
    if (typeof str !== 'string') throw new Error('invalid parameter');

    return str.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
  }

  static formatDocument(str: string): string {
    if (typeof str !== 'string') throw new Error('invalid parameter');
    const parsedString = FormatUtils.extractNumbers(str);

    if (parsedString.length !== 11 && parsedString.length !== 14) return str;
    return parsedString.length === 11
      ? FormatUtils.formatCPF(parsedString)
      : FormatUtils.formatCNPJ(parsedString);
  }

  static extractNumbers(str: string) {
    return str.replace(/[^\d]+/g, '');
  }
}

class ValidationUtils {
  private constructor() {}

  static isAlpha(str: string) {
    if (typeof str !== 'string') throw new Error('invalid parameter');

    return /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i.test(str);
  }

  static hasOnlyAlpha(str: string): boolean {
    if (typeof str !== 'string') throw new Error('invalid parameter');

    return str.split(' ').every((word) => ValidationUtils.isAlpha(word) || word === '');
  }

  static hasOnlyNumeric(str: string): boolean {
    if (typeof str !== 'string') throw new Error('invalid parameter');

    return str.split(' ').every((word) => isNumeric(word) || word === '');
  }

  static validateCel(number: string) {
    if (number && number.length > 0) {
      const regExp = new RegExp('^[1-9]{2}9[0-9]{1}[0-9]{7}$');
      const parsedNumber = FormatUtils.extractNumbers(number);
      return regExp.test(parsedNumber);
    }
    return true;
  }

  static validateCPF(cpf: string) {
    const parsedCPF = FormatUtils.extractNumbers(cpf);
    if (parsedCPF === '') return false;

    if (
      parsedCPF.length !== 11 ||
      parsedCPF === '00000000000' ||
      parsedCPF === '11111111111' ||
      parsedCPF === '22222222222' ||
      parsedCPF === '33333333333' ||
      parsedCPF === '44444444444' ||
      parsedCPF === '55555555555' ||
      parsedCPF === '66666666666' ||
      parsedCPF === '77777777777' ||
      parsedCPF === '88888888888' ||
      parsedCPF === '99999999999'
    )
      return false;

    let add = 0;
    let rev: number;

    for (let i = 0; i < 9; i++) add += parseInt(parsedCPF.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(parsedCPF.charAt(9))) return false;
    add = 0;

    for (let i = 0; i < 10; i++) add += parseInt(parsedCPF.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);

    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(parsedCPF.charAt(10))) return false;

    return true;
  }

  static validateEmail(email: string): boolean {
    if (email.length === 0) {
      return true;
    }

    if (!isEmail(email)) {
      return false;
    }

    return true;
  }

  static isInvalidTextField(textToEvaluate: any, minimumSize: number) {
    let isInvalid: boolean = false;

    if (textToEvaluate) {
      let indexOfWhiteSpace = textToEvaluate.indexOf(' ');

      const hasInvalidWhiteSpace =
        indexOfWhiteSpace === -1 ||
        indexOfWhiteSpace === 0 ||
        textToEvaluate.substring(textToEvaluate.length - 1, textToEvaluate.length) === ' ';

      const textToEvaluateWithoutSpaces = textToEvaluate.replaceAll(' ', '');
      isInvalid = hasInvalidWhiteSpace || textToEvaluateWithoutSpaces.length < minimumSize;
    }

    return isInvalid;
  }
}

export default class StringUtils {
  static format = FormatUtils;
  static validation = ValidationUtils;
}
