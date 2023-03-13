import React, {useEffect} from "react";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import "./sidebar.scss";
import {ListItemIcon} from "@mui/material";
import { Link,useLocation } from "react-router-dom";
import dashboardIcon from "../../../assets/images/dahsboard.svg";
import userProfile from "../../../assets/images/userProfile.svg";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";
import { connectionWithSocketServer } from "../../../realtimeCommunication/socketConnection";
const drawerWidth = 240;

export const Sidebar = () => {
    const location = useLocation()
    const history = useHistory();
    const {user} = useSelector(state => state.auth);
    useEffect(()=>{
        if(user && user.id){
            console.log('tokenen',user.token)
            connectionWithSocketServer(user)
        }
    },[])
  const isActive = (value) => (location?.pathname === value ? 'active' : '')
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
            <List>


                    <ListItem disablePadding className={isActive('/dashboard')} onClick={()=>history.push('/dashboard')}>
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={dashboardIcon}/>
                            </ListItemIcon>
                            <ListItemText>

                                   Dashboard

                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                <ListItem disablePadding className={isActive('/profile')} onClick={()=>history.push('/profile')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={userProfile}/>
                        </ListItemIcon>
                        <ListItemText>

                              Profile

                        </ListItemText>
                    </ListItemButton>
                </ListItem>


                    <ListItem disablePadding className={isActive('/companies')}
                              onClick={() => history.push('/companies')}>
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={userProfile}/>
                            </ListItemIcon>
                            <ListItemText>

                                Companies

                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                <ListItem disablePadding className={isActive('/reports')} onClick={()=>history.push('/reports')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={userProfile}/>
                        </ListItemIcon>
                        <ListItemText>

                            Reports

                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className={isActive('/users')} onClick={()=>history.push('/users')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={userProfile}/>
                        </ListItemIcon>
                        <ListItemText>

                          Users

                        </ListItemText>
                    </ListItemButton>
                </ListItem>

            </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
