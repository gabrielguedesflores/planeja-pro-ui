import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BoxContainer = styled(Box)`
  background-color: ${({ theme }: any) =>
    theme.palette.mode === 'light'? theme.palette.grey[100] : theme.palette.grey[900]
  },
  flex-grow: 1,
  height: '100vh',
  overflow: 'auto',
`;