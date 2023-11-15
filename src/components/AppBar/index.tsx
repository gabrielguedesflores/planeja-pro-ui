import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavBar } from './styles';
import Profile from '../Profile';
import { Title, TitleCard } from '..';
import { Colors } from '../../assets/theme';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
}

export default function AppBar({ open, toggleDrawer }: AppBarProps) {

  return (
    <NavBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          <TitleCard variant="h5" color={Colors.light}>Dashboard</TitleCard>
        </Typography>

        {/* <ButtonSwitchTheme /> */}
        <Profile />
      </Toolbar>
    </NavBar>
  );
}