import React, {useState} from 'react';
import "./profile.css"
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, TextField} from "@material-ui/core";
import {Col, Container, Row} from "react-bootstrap";
import Profile from "./profile"
import FavoriteCars from "./favoriteCars"
import FavoriteLocations from "./favoriteLocations"

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function UserTabs() {

    const [value, setValue] = React.useState(2);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const nameHandler = (event) => {
        setName(event.target.value);
    };
    const emailHandler = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div className="userProfile">
                <Container>
                    <div className="userProfileTabs">
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"
                                  centered>
                                <Tab label="خودروهای منتخب" {...a11yProps(2)} />
                                <Tab label="آدرس های منتخب" {...a11yProps(1)} />
                                <Tab label="پروفایل" {...a11yProps(0)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={2}>
                            <Profile/>

                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <FavoriteLocations/>
                        </TabPanel>
                        <TabPanel value={value} index={0}>
                            <FavoriteCars/>
                        </TabPanel>
                    </div>
                </Container>
            </div>
    );
}
