import React, { Fragment, FunctionComponent, Profiler, ProfilerOnRenderCallback, useContext, useState } from 'react'

import { Collapse, Divider, Icon, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';
import { MENU_ROUTES } from '../../utils/constants';
import { userHasAnyOfRoles } from '../../services/auth-service';
import { AuthUser, IMenuItem } from '../../types/types';
import * as authService from '../../services/auth-service'
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

interface ExpandableMenuProps {
  itemRequest: boolean
  inventory: boolean
}


const MenuListItems: FunctionComponent<Props> = ({authUser}) => {
  const classes = useStyles();
  const [expandableMenus, setExpandableMenus] = useState<ExpandableMenuProps>({itemRequest: false, inventory: false})
  const [inventoryOpen, setInventoryExpand] = useState(false)
  const location = useLocation();

  const history = useHistory()

  const handleLogoutClick = ()=> {
    console.log('lets logout.......')
    authService.logout()
    history.push('/login')
  }

  const handleToggleExpandableMenu = (menuKey: keyof ExpandableMenuProps) => {
    if(!menuKey) return
    const value: boolean = expandableMenus[menuKey]
    setExpandableMenus({...expandableMenus, [menuKey]: !value})
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

  const handleProfilerOnRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interractions) => {
    //console.log('Profiler', id, actualDuration)
  }

  const displayMainMenu = (menuItem: IMenuItem, index: number) => {
    if(!menuItem.roles) {
      return (
        <Link to={menuItem.path} className={classes.link} color="primary" key={index}>
          <ListItem button selected ={activeLink(menuItem.path)}>
            <ListItemIcon>
              <Icon>{menuItem.icon}</Icon>
              </ListItemIcon>
            <ListItemText primary={menuItem.label} />
          </ListItem>
        </Link>
      )
    } else {
      return userHasAnyOfRoles(authUser?.roles, menuItem.roles) ? (
        <Link to={menuItem.path} className={classes.link} color="primary" key={index}>
        <ListItem button selected ={activeLink(menuItem.path)}>
          <ListItemIcon>
            <Icon>{menuItem.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={menuItem.label} />
        </ListItem>
        </Link>
      ) : null;
    }
  }

  const displaySubMenu = (menuItem: IMenuItem, index: number) => {
    if((menuItem.roles && userHasAnyOfRoles(authUser?.roles, menuItem.roles)) || !menuItem.roles) {
      return (
        <Fragment key={index}>
          <ListItem button onClick={() => handleToggleExpandableMenu(menuItem.id as keyof ExpandableMenuProps)} selected={activeLink(menuItem.path)}>
            <ListItemIcon>
              <Icon>{menuItem.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={menuItem.label} />
            {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandableMenus[menuItem.id as keyof ExpandableMenuProps]} timeout="auto" unmountOnExit key={index}>
            <List component="div" disablePadding>
              {menuItem.children && menuItem.children.map((it, index) => {
                return (
                  <Link to={it.path} className={classes.link} key={index}>
                    <ListItem button className={classes.nested} selected={activeLink(it.path)}>
                      <ListItemIcon>
                        <Icon>{it.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText primary={it.label} />
                    </ListItem>
                  </Link>
                )
              })}
            </List>
          </Collapse>
        </Fragment>
      )
    } else {
      return null
    }
    
  }

  return (
    <Profiler id="MenuList" onRender={handleProfilerOnRender}>
      {MENU_ROUTES.map((menuItem, index) => {
        return !menuItem.children ? displayMainMenu(menuItem, index) : displaySubMenu(menuItem, index)
      })}
      <Divider style={{marginTop: '20px'}} />
      <ListItem button onClick={handleLogoutClick}>
        <ListItemIcon>
          <Icon>power_settings_new</Icon>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Profiler>
  )
}

export default MenuListItems