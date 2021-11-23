import React,{useContext} from "react";
import {ArtistCardContext} from "../store/artistContext"
import {AppBar,Box,Toolbar,IconButton,Typography,Badge,MenuItem,Menu} from '@mui/material';
import {Link} from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export default function AppBar1(props) {

  //컨텍스트 사용하기
  const context = useContext(ArtistCardContext)

  const isLogin = props.isLogin
  console.log(isLogin)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogout = ()=>{
    sessionStorage.removeItem('user_id')
    document.location.href = '/login'
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen} 
      onClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}><Link to={`/mypage/${sessionStorage.user_id}`} className='nav-link' exact>마이 페이지</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to={`/admin`} className='nav-link'>관리자 공간</Link></MenuItem>
    </Menu>
  );
  // const renderMenuX = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMenuOpen} 
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  //로그인 안되있을경우
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="default">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="default"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem className="login" isLogin={isLogin}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
        >
          <AccountCircle />
        </IconButton >
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  //로그인되있을 경우
  
  const renderMobileMenuX = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="default">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="default"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications{context.artistName}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem className="login" isLogin={isLogin}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
          onClick={onLogout}
        >
          <AccountCircle />
        </IconButton >
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
//////////////////////////////////햄버거바
const [state, setState] = React.useState({
  left: false,
});

const toggleDrawer = (anchor, open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List sx={{mt:10}}>
        <h5 > 바로가기</h5>
        <Link to='/shop' style={{color:"black",textDecoration:"none"}}>
        <ListItem >
          <ListItemIcon>
             <InboxIcon />
          </ListItemIcon>
          <h5 style={{marginLeft:5}}>SHOP</h5>
        </ListItem>
        </Link>
        <Link to='/board' style={{color:"black",textDecoration:"none"}}>
        <ListItem >
          <ListItemIcon>
             <InboxIcon />
          </ListItemIcon>
          <h5 style={{marginLeft:5}}>Notice</h5>
        </ListItem>
        </Link>
    </List>
    <Divider sx={{m:2}}/>
    
    <List>
    <h5 >가입한 가수들</h5>
      {context && context.map((artist, index) => (
        <Link to={`/artist/${artist.artistName}`} style={{color:"black",textDecoration:"none"}}>
        <ListItem button key={index}>
          <ListItemIcon>
              <div>
                <img style={{width:50,height:50, borderRadius:50}} src={artist.artistCardImg} alt="가수이미지"></img>
              </div>
          </ListItemIcon>
          <h5 style={{marginLeft:5}}>{artist.artistName}</h5>
        </ListItem>
        </Link>
      ))}
    </List>
  </Box>
);
////////////////////////////////////////////햄버거마침


return (
  <Box sx={{ flexGrow: 1 , bgcolor: 'secondary.main' }}  >
    <AppBar position="fixed" sx={{ bgcolor: 'white' }}>
      <Toolbar>

      {['left'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>
        <IconButton
          size="large"
          edge="start"
          color="default"
          aria-label="open drawer"
          sx={{ mr: 5 }}
        >
          <MenuIcon />
        </IconButton>

        </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)} //밖에눌렀을때
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    ))}
      <Link to='/'className='nav-link'>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block'}, color:'#06e19a', fontWeight: 'bold'}}
        >
          Wooks Child
        </Typography>
      </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="default">
            <Badge badgeContent={0} color="error">
              <MailIcon/>
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="default"
          >
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="default"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="default"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    {!isLogin ? renderMobileMenu: renderMobileMenuX}
    {renderMenu}
  
  </Box>
);
}
