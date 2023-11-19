import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavBar } from './styles';
import Profile from '../Profile';
import { Title, TitleCard } from '..';
import { Colors } from '../../assets/theme';
import { menuMapping } from '../../utils/menuMapping';
import { useLocation } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
}

export default function AppBar({ open, toggleDrawer }: AppBarProps) {
  const location = useLocation();

  const getCurrentPageTitle = () => {
    const pathname: string = location.pathname.replace('/', '');
    return Object.keys(menuMapping).includes(pathname) ? menuMapping[pathname] : '';
  };
  
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
          <Typography variant="h6">{getCurrentPageTitle()}</Typography>
        </Typography>

        {/* <ButtonSwitchTheme /> */}
        <Profile />
      </Toolbar>
    </NavBar>
  );
}