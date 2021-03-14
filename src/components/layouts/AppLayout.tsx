import { AppBar, Badge, Container, CssBaseline, Divider, Drawer, IconButton, List, makeStyles, Toolbar, Typography } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import clsx from 'clsx';
import React, { FunctionComponent, useState, useContext } from 'react'
import MenuListItems from '../core/MenuListItems';
import CopyRight from '../core/CopyRight';
import { AppContext } from '../../context/AppProvider';
import { UserContext } from '../../context/UserProvider';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import SettingsPage from '../../pages/SettingsPage';
import DepartmentListPage from '../../pages/department/DepartmentListPage';
import DepartmentCreatePage from '../../pages/department/DepartmentCreatePage';
import EditDepartmentPage from '../../pages/department/EditDepartment';
import SupplierListPage from '../../pages/supplier/SupplierListPage';
import CreateSupplierPage from '../../pages/supplier/CreateSupplierPage';
import EditSupplierPage from '../../pages/supplier/EditSupplierPage';
import ListUserPage from '../../pages/user/ListUserPage';
import CreateUserPage from '../../pages/user/CreateUserPage';
import EditUserPage from '../../pages/user/EditUserPage';
import { appPages, APP_MODULES } from '../../utils/constants';
import CreateRequestItem from '../../pages/item-request/CreateItemRequestPage';
import ItemRequestIndexPage from '../../pages/item-request/ItemRequestIndexPage';
import CreateItemRequestPage from '../../pages/item-request/CreateItemRequestPage';

const drawerWidth = 240;

const useStyles = makeStyles(theme=> ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mainContainer: {
    width: '100%',
    flexGrow: 1,
    padding: '10px'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



// const user:User = {
//   id: 562,
//   firstName: 'etornam',
//   lastName: 'anyidoho',
//   username: 'etoretornam',
//   email: 'etornamanyidoho@gmail.com',
//   phoneNumber: '0548556086',
//   employeeLevel: 'junior'
// }

const AppLayout:FunctionComponent = ()=> {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(true);

  //get location
  const location = useLocation();
  const { path } = useRouteMatch()

  const appContext = useContext(AppContext)
  const userContext = useContext(UserContext)

  console.log('user', userContext.user)
  const handleDrawerOpen = ()=> {
    setOpen(true);
  }

  const handleDrawerClose = ()=> {
    setOpen(false);
  }

  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{marginRight: '20px'}}>
            <img width="40" height="50" src="https://www.blueskies.com/wp-content/uploads/2017/10/logo-01.png" alt="" loading="eager" />
          </div>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {appContext.currentPage}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MenuListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.mainContainer}>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={300}
              >
                <Switch location={location}>
                  <Route path={`${path}${APP_MODULES.SETTINGS_MODULE.path}`} component={SettingsPage}/>
                  <Route path={`${path}departments/create`} component={DepartmentCreatePage}/>
                  <Route path={`${path}departments/:departmentId/edit`} component={EditDepartmentPage} />
                  <Route path={`${path}departments`} component={DepartmentListPage}/>
                  <Route path={`${path}supplier-management/suppliers/:supplierId/edit`} component={EditSupplierPage}/>
                  <Route path={`${path}supplier-management/suppliers/create`} component={CreateSupplierPage}/>
                  <Route path={`${path}supplier-management/suppliers`} component={SupplierListPage}/>
                  <Route path={`${path}user-management/users/create`} component={CreateUserPage}/>
                  <Route path={`${path}user-management/users/:userId/edit`} component={EditUserPage}/>
                  <Route path={`${path}user-management/users`} component={ListUserPage}/>
                  <Route path={`${path}${APP_MODULES.REQUEST_ITEM_MODULE.path}/my-requests/create`} component={CreateItemRequestPage}/>
                  <Route path={`${path}${APP_MODULES.REQUEST_ITEM_MODULE.path}`} component={ItemRequestIndexPage}/>
                  <Route exact path={`${path}`} component={HomePage}/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <div style={{width:'100%', marginTop: 'auto'}}>
            <CopyRight />
          </div>
        </Container>
      </main>
    </div>
  );
}

export default AppLayout;