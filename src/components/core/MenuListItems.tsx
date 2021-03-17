import React, { Fragment, FunctionComponent, useContext, useState } from 'react'

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
import { appPages, APP_PAGES_AND_ROLES } from '../../utils/constants';
import { userHasAnyOfRoles } from '../../services/auth-service';
import { AuthUser } from '../../types/User';
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
  },
  listItem: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: '#ffffff'
  }
}));

interface Props {
  authUser: AuthUser | undefined
}


const MenuListItems: FunctionComponent<Props> = ({authUser}) => {
  const classes = useStyles();
  const [inventoryOpen, setInventoryExpand] = useState(false)
  const [reportExpand, setReportExpand] = useState(false)
  const [userAdminOpen, setUserAdminOpen] = useState(false)

  const [expandedMenu, setExpandedMenu] = useState("");
  const location = useLocation();
  const appContext = useContext(AppContext)

  const handleExpandInventory = ()=> {
    let val = !inventoryOpen
    setInventoryExpand(val);
  }

  const activeLink = (subString: string): boolean => {
    const pathMatches = location.pathname === subString
    if(pathMatches) {
      return true
    } else if((location.pathname.indexOf(subString) >= 0) && (subString.length > 1)) {
      return true
    } else {
      return false
    }
  }

  const handleSetExpandedMenu = (value: ExpandedMenu.inventory | ExpandedMenu.userAdmin)=> {
    setExpandedMenu(value);
  }

  const handleSetCurrentPageName = (value: string) => {
    appContext.updateCurrentPage(value)
  }

  return (
    <Fragment>
      {userHasAnyOfRoles(authUser?.roles, APP_PAGES_AND_ROLES.dashboardRoles) ? 
      <Link to="/" className={classes.link} color="primary">
        <ListItem button selected ={activeLink('/')}>
          <ListItemIcon>
            <DashBoardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      : null}
      {userHasAnyOfRoles(authUser?.roles, APP_PAGES_AND_ROLES.listDepartmentsRoles) ?
      <Link to="/departments" className={classes.link} onClick={()=> handleSetCurrentPageName(appPages.department)}>
        <ListItem button selected={activeLink('/department')}>
          <ListItemIcon>
            <DepartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Department" />
        </ListItem>
      </Link> : null}
      <ListItem button onClick={handleExpandInventory} selected={activeLink('/request-management')}>
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
          {userHasAnyOfRoles(authUser?.roles, APP_PAGES_AND_ROLES.hodEndorseRoles) ? <Link to="/request-management/hod-item-requests" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="HOD Item Requests" />
            </ListItem>
          </Link> : null}
          {userHasAnyOfRoles(authUser?.roles, APP_PAGES_AND_ROLES.generalManagerApproveRoles) ?<Link to="/request-management/general-manager-item-requests" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="GM Requests" />
            </ListItem>
          </Link> : null}
          {userHasAnyOfRoles(authUser?.roles, APP_PAGES_AND_ROLES.procurementOfficerApproveRoles) ? <Link to="/request-management/procurement-officer-item-requests" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubMenuItemIcon />
              </ListItemIcon>
              <ListItemText primary="Endorsed Requests" />
            </ListItem>
          </Link> : null}
        </List>
      </Collapse>
      {userHasAnyOfRoles(authUser?.roles, APP_PAGES_AND_ROLES.listSupplierRoles) ? <Link to="/supplier-management/suppliers" className={classes.link}>
        <ListItem button selected={activeLink('/suppliers')}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faTruckMoving} style={{width: iconSize, height: iconSize}} />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>
      </Link> : null}
      {userHasAnyOfRoles(authUser?.roles, APP_PAGES_AND_ROLES.listUserRoles) ? <Link to="/user-management/users" className={classes.link} onClick={()=> handleSetCurrentPageName(appPages.userManagementPage)}>
        <ListItem button selected={activeLink('/user-management')}>
          <ListItemIcon>
            <AdminUserIcon />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
      </Link> : null}
      <Link to="/settings" className={classes.link}>
        <ListItem button selected={activeLink('settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="settings" />
        </ListItem>
      </Link>
    </Fragment>
    
  )
}

export default MenuListItems