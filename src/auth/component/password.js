import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { CircularProgress} from "@material-ui/core";

export default class Password extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            newpassword:'',
            isLoading:false,
            error:''
        }
    }

    componentDidMount(){
        const user = localStorage.getItem('user');
        this.setState({
            email:user
        })
    }


    handlePassword = () => {
        this.setState({
            isLoading:true
        })
        fetch(`https://server.mysastaprice.com/auth/password`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(this.state)
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch data')
            }
            return res.json();
        })
        .then(response => {
                console.log(response)
                this.setState({
                    isLoading:false
                })
                alert('Password Changed Successfully')
                window.location.reload(false);
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false,
                error:err
            })
            alert(err)
        })
    }


    render() {
        const classes = this.props;
        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
                    
                    <Typography style={{color:'white'}}>
                        Change Password
                    </Typography>

                    <Typography style={{color:'white'}}>
                    {
                        this.state.isLoading ? 'Loading...' : this.state.email
                    }
                    </Typography>

                </div>
            <div style={{
                height:'90vh',
                overflowY:'scroll',
                overflowX:'hidden',
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                padding:'0.5rem'
                }}>
                <div style={{ width:'100%', display:'flex', justifyContent:'space-around', flexDirection:'column', alignItems:'center'}}>
                   
                <div style={{padding:'1rem'}}>
                    <Paper elevation={3} style={{ padding:'1rem', width:'400px', minHeight:'200px', display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}>
                    <Typography style={{padding:'10px', fontSize:'1.2rem', fontWeight:'bold'}}>Change Password</Typography>
                    <div style={{width: '250px'}} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Enter Old Password"
                            name="password"
                            type="password"
                            autoFocus={false}
                            autoComplete={false}
                            onChange = {(event) => this.setState({password:event.target.value})}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="newpassword"
                            label="Enter New Password"
                            name="newpassword"
                            type="newpassword"
                            autoFocus={false}
                            autoComplete={false}
                            onChange = {(event) => this.setState({newpassword:event.target.value})}
                        />
                        
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled = {this.state.title === '' ? true : false}
                            style={{margin:'10px 0', width:'100%'}}
                            onClick={this.handlePassword}
                        >
                        {this.props.isLoading ? <CircularProgress /> : 'Submit' }
                        </Button>
                        </div>

                       
                        </div>
                    </Paper>
            </div>
                    
                </div>

                
            </div>
            </div>
        )
    }
}
