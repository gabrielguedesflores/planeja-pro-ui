import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import MainListItems, { secondaryListItems } from '../../routes/listItems';
import { Divider, IconButton, Toolbar, styled } from '@mui/material';
import { Colors, Fonts } from '../../assets/theme';

interface AppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      fontFamily: Fonts.font_family,
      whiteSpace: 'nowrap',
      width: drawerWidth,
      backgroundColor: Colors.secondary,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Sidebar = ({ open, toggleDrawer }: AppBarProps)  => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer} style={{ color: Colors.light, }}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <MainListItems />
        <Divider sx={{ my: 1 }} />
      </List>
    </Drawer>
  );
};

export default Sidebar;
