import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from "react-router-dom";

//https://mui.com/material-ui/react-app-bar/
export default function Header() {
    //const pages = ['Calendar', 'Sessions', 'Clients'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };



    return (
        <>
            <AppBar position="static" >

                <Toolbar disableGutters>
                    <Link to='/'>
                        <Typography
                            variant="h5"
                            noWrap
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                ml: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            PE<FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mt: 0.4 }} />TRA
                        </Typography>
                    </Link>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <MenuItem onClick={handleCloseNavMenu} sx={{ display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>
                                <Link to='/' ><Button><CalendarMonthIcon sx={{ display: { xs: 'flex', md: 'none' }, mt: 0.2, mr: 1 }} />Home-Calendar</Button></Link>
                                <Link to='customers' ><Button><GroupIcon sx={{ display: { xs: 'flex', md: 'none' }, mt: 0.2, mr: 1 }} />Customers</Button></Link>
                                <Link to='sessions' ><Button><SportsMartialArtsIcon sx={{ display: { xs: 'flex', md: 'none' }, mt: 0.2, mr: 1 }} />Sessions</Button></Link>
                                <Link to='stats' ><Button><BarChartIcon sx={{ display: { xs: 'flex', md: 'none' }, mt: 0.2, mr: 1 }} />Stats</Button></Link>
                            </MenuItem>

                        </Menu>
                    </Box>

                    <Link to='/'>
                        <Typography
                            variant="h5"
                            noWrap
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                textDecoration: 'none',
                                color:'white'
                            }}
                        >
                            PE<FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mt: 0.4 }} />TRA
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 2 }}>

                        <Link to='/' ><Button sx={{ color: "white" }}><CalendarMonthIcon sx={{ display: { xs: 'none', md: 'flex' }, mt: 0.1, mr: 1, ml: 2, fontSize: 'medium' }} />Home/Calendar</Button></Link>
                        <Link to='customers' ><Button sx={{ color: "white" }}><GroupIcon sx={{ display: { xs: 'none', md: 'flex' }, mt: 0.1, mr: 1, ml: 2, fontSize: 'medium' }} />Customers</Button></Link>
                        <Link to='sessions' ><Button sx={{ color: "white" }}><SportsMartialArtsIcon sx={{ display: { xs: 'none', md: 'flex' }, mt: 0.1, mr: 1, ml: 2, fontSize: 'medium' }} />Sessions</Button></Link>
                        <Link to='stats' ><Button sx={{ color: "white" }}><BarChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mt: 0.1, mr: 1, ml: 2, fontSize: 'medium' }} />Stats</Button></Link>

                    </Box>
                </Toolbar>

            </AppBar>
        </>
    );
}