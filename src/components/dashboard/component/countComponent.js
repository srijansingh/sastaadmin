import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";
import LabelIcon from '@material-ui/icons/Label';


const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});

class CountComponent extends Component {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root} style={{width:'100%', display:'flex',  justifyContent:'flex-start'}}>
                <Paper elevation={3} style={{width:'200px',background:'white', height:"100px", display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                   
                    <div style={{background:'lawngreen', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center', width:'80px'}} >
                         <LabelIcon style={{color:'white', fontSize:'3rem'}}/>
                   </div>
                   <div style={{width:'100%'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
                                <div style={{fontSize:'1rem',fontWeight:'bold', color:'lawngreen'}}>Total Category</div>
                                <div style={{fontSize:'1.5rem',color:'lawngreen', fontWeight:'bold'}}>{this.props.category}</div>
                        </div>
                   </div>

                </Paper>

                <Paper elevation={3} style={{width:'200px',background:'white', height:"100px", display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                   
                    <div style={{background:'orange', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center', width:'80px'}} >
                         <LabelIcon style={{color:'white', fontSize:'3rem'}}/>
                   </div>
                   <div style={{width:'100%'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
                                <div style={{fontSize:'1rem',fontWeight:'bold', color:'orange'}}>Total Customer</div>
                                <div style={{fontSize:'1.5rem',color:'orange', fontWeight:'bold'}}>{this.props.customer}</div>
                        </div>
                   </div>
                   
                </Paper>

                
            </div>
        )
    }
}

export default withStyles(styles, {withTheme:true})(CountComponent);