import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import "./Sidebar.css"
import { Divider } from '@material-ui/core';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}


const styles = (theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  });

  class Sidebar extends Component {
    constructor(){
        super();
        this.state={
            open:false,
            category:false,
            order:false
        }
    }

    handleCategory = () => {
        this.setState({
            category:!this.state.category
        })
    }
    handleOrder = () => {
        this.setState({
            order:!this.state.order
        })
    }

    handleClick = () => {
        this.setState({
            open:!this.state.open
        })
    }
    render() {

        // const {classes} = this.props;

        return (

            <div className="sidebar">
                <List>
                    <ListItemLink key="0"  href="/">
                            <ListItemIcon><DashboardIcon style={{color:"blue"}}/></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                    </ListItemLink>

                    <ListItemLink key="2" href="/active">
                            <ListItemIcon><FaceIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Active Category" />
                    </ListItemLink>
                    <ListItemLink key="5" href="/inactive">
                            <ListItemIcon><FaceIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Inactive Category" />
                    </ListItemLink>

                    <ListItemLink key="3" href="/customers">
                            <ListItemIcon><FaceIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Customers" />
                    </ListItemLink>

                    <Divider />

                
                    <ListItemLink key="7" onClick={this.props.logout}>
                            <ListItemIcon><ExitToAppIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Logout" />
                    </ListItemLink>

                    <ListItemLink  key="8" href="/password">
                            <ListItemIcon><ExitToAppIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Change Password" />
                    </ListItemLink>
                </List>
            </div>

        )
    }
}

export default withStyles(styles, {withTheme:true})(Sidebar)