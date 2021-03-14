import React, { Fragment, useContext, useState } from 'react'

import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashBoardIcon from '@material-ui/icons/Dashboard'
import AdminUserIcon from '@material-ui/icons/Group'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import { ExpandedMenu } from '../../types/ExpandedMenu';
import DepartmentIcon from '@material-ui/icons/Apartment'
import InventoryIcon from '@material-ui/icons/DesktopMac'
import SubMenuItemIcon from '@material-ui/icons/Adjust'
import SettingsIcon from '@material-ui/icons/Settings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/AppProvider';
import { appPages } from '../../utils/constants';
// import clsx from 'clsx';

const iconSize = '25px'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.default
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activeRoute: {
    backgroundColor: 'red',
    color: 'white'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  faNavIcon: {
    height: '50px',
    width: '50px'
  }
}));


const MenuListItems = () => {
  const classes = useStyles();
  const [inventoryOpen, setInventoryExpand] = useState(false)
  const [reportExpand, setReportExpand] = useState(false)
  const [userAdminOpen, setUserAdminOpen] = useState(false)

  const [expandedMenu, setExpandedMenu] = useState("");
  const location = useLocation();
  const appContext = useContext(AppContext)

  // const activeRoute = (routeName)=> {
  //   return location.pathname.indexOf(routeName) > -1
  // }

  const handleExpandInventory = ()=> {
    let val = !inventoryOpen
    setInventoryExpand(val);
  }

  const handleExpandReport = ()=> {
    let val = !reportExpand
    setReportExpand(val);
  }
  
  const handleExpandUserAdmin = ()=> {
    let val = !userAdminOpen
    setUserAdminOpen(val);
  }

  const handleSetExpandedMenu = (value: ExpandedMenu.inventory | ExpandedMenu.userAdmin)=> {
    setExpandedMenu(value);
  }

  const handleSetCurrentPageName = (value: string) => {
    appContext.updateCurrentPage(value)
  }

  return (
    <Fragment>
      <Link to="/" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <DashBoardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to="/departments" className={classes.link} onClick={()=> handleSetCurrentPageName(appPages.department)}>
        <ListItem button>
          <ListItemIcon>
            <DepartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Department" />
        </ListItem>
      </Link>
      <ListItem button onClick={handleExpandInventory}>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Item Requests"/>
        {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/request-management/my-requests" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="My Requests" />
            </ListItem>
          </Link>
          <Link to="/request-management/my-requests/create" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="New Request" />
            </ListItem>
          </Link>
          <Link to="/request-management/employee-requests" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="Employee Requests" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <ListItem button onClick={handleExpandUserAdmin}>
        <ListItemIcon>
          <AdminUserIcon />
        </ListItemIcon>
        <ListItemText primary="Admin"/>
        {userAdminOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={userAdminOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/user-management" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
          </Link>
          <Link to="/role-management" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="Role Management" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <Link to="/supplier-management/suppliers" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faTruckMoving} style={{width: iconSize, height: iconSize}} />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>
      </Link>
      <Link to="/user-management/users" className={classes.link} onClick={()=> handleSetCurrentPageName(appPages.userManagementPage)}>
        <ListItem button>
          <ListItemIcon>
            <AdminUserIcon />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
      </Link>
      <Link to="/Settings" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </Link>
    </Fragment>
    
  )
}

export default MenuListItems