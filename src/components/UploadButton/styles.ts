import styled from '@emotion/styled';
import { Colors, Fonts, Spacing } from '../../assets/theme';
import { Button } from '@mui/material';

export const Wrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 4px;
`;

interface FileInfoProps {
  clickable?: boolean;
}

// novo
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li.list-item {
    font-size: ${Fonts.font_size_sm};
    font-weight: ${Fonts.font_weight_default};
    color: ${Colors.neutral_dark};
    background-color: ${Colors.neutral_lightest};
    padding: ${Spacing.spacing_inset_md};
    border-top: 1px solid ${Colors.neutral_medium};

    &.error {
      color: ${Colors.feedback_negative_light};
      font-size: 14px;
    }
  }

  li.list-item:hover {
    background-color: ${Colors.neutral_light};
    cursor: pointer;
  }

  li {
    display: flex;
    align-items: center;

    svg {
      color: #018b6a;
      font-size: 19px;
      margin-right: 8px;
    }

    div {
      flex: 1;
      cursor: pointer;
    }

    .title {
      text-align: left;
      font-weight: 600;
      font-size: ${Fonts.font_size_sm};
      font-weight: ${Fonts.font_weight_hg};
      letter-spacing: ${Fonts.letter_spacing_lg};
      color: ${Colors.neutral_dark};
      margin-bottom: ${Spacing.spacing_stack_sm};
    }

    .file {
      max-width: 40w;
    }

    .material-icons {
      font-size: 19px;
      margin-right: 0.5rem;

      &.remove {
        color: ${Colors.neutral_dark};
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 10px 0;
  flex: 1;
`;

export const Preview = styled.img`
  /* max-width:500px; */
  max-height: 450px;
  width: auto;
  height: auto;
`;

export const Alert = styled.div`
  color: #f54b5e;
  font-size: 12px;
  padding: 10px 0 10px 36px;
  font-style: italic;
  margin-bottom: 10px;
`;

// Velho

export const FileInfo = styled.small<FileInfoProps>`
  font-size: ${Fonts.font_size_xxs};
  color: ${Colors.neutral_dark};
  word-break: break-all;
  background-color: ${Colors.neutral_light};
  padding: 8px 16px;
  text-align: left;
  border-radius: 0px 0px 4px 4px;

  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'unset')};
  }
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 1;
  width: 1;
  opacity: 0;
  user-select: none;
  z-index: -1;
`;

export const HelperText = styled.div`
  font-size: 12px;
  font-style: italic;
`;

export const ButtonContainer = styled.div`
  width: auto;
`;

interface UploadContainerProps {
  visible?: boolean;
}

export const UploadContainer = styled.div<UploadContainerProps>`
  display: flex;
  flex-direction: column;
  border: ${(props) => (props.visible ? `1px solid ${Colors.neutral_medium}` : '0')};
  padding: ${(props) => (props.visible ? `${Spacing.spacing_inset_md}` : '0')};
  border-radius: 8px;
  gap: ${(props) => (props.visible ? `${Spacing.spacing_stack_sm}` : '0')};

  .label {
    margin-bottom: ${(props) => (props.visible ? '-0.5rem' : '')};
  }
`;

export const Text = styled.div`
  font-size: ${Fonts.font_size_sm};
  color: ${Colors.neutral_dark};
  margin-bottom: 0.5rem;
`;

export const CustomButton = styled(Button)(() => ({
  border: `1px solid ${Colors.neutral_medium}`,
  padding: Spacing.spacing_squish_md_r,
  textTransform: 'none',
  display: 'flex',
  '&.with-icon': {
    justifyContent: 'flex-start',
  },
  '&.MuiButton-label': {
    width: 'auto',
    textAlign: 'left',
  },
  '&.MuiButton-root': {
    fontSize: Fonts.font_size_sm,
  },
  '&.MuiButton-text': {
    display: 'inline-block',
    width: 'fit-content',
    border: 'none',
  },
}));