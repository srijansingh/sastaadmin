import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";

import CountComponent from "./component/countComponent";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { API_KEY, API_URL, BASE_URL } from "../../config/baseUrl";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import { CircularProgress} from "@material-ui/core";
import axios from "axios";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
        form: {
            width: '250px', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          },
       
    }});
  

class  Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            all:0,
            category:0,
            customer:0,
            title:'',
            products:[],
            isSearching:false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        this.countFunction();
                
    }
    
    countFunction = () => {
        fetch(`${BASE_URL}/category`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer '+this.props.token
                }
            })
            .then(res => {
                if(res.status !==200){
                    throw new Error('Failed to fetch the product')
                }
                return res.json()
            })
            .then(response => {
                this.setState({
                    category:response.data.length
                }) 
            })
    
    
    
            fetch(`${BASE_URL}/customer`, {
              method: "GET",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  Authorization: 'Bearer '+this.props.token
              }
            })
            .then(res => {
                if(res.status !==200){
                    throw new Error('Failed to fetch the product')
                }
                return res.json()
            })
            .then(response => {
                this.setState({
                  customer:response.data.length
                }) 
            })
      
      }
     
      addCategory = () => {
          this.setState({
              isLoading:true
          })

          fetch(`${BASE_URL}/category`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization:'Bearer '+this.props.token
                },
                body: JSON.stringify({title:this.state.title})
                }).then(result => {
                    result.json().then(response => {
                        
                        this.setState({
                            isLoading: false
                        })
                        alert('Catagory Added Successfully')
                        window.location.reload(false);
                        
                    })
                }).catch(err => {
                    alert("Something went wrong")
                    this.setState({
                        isLoading: false,
                        error: err
                    });
                })  

      }


      handleSearch = () => {
        this.setState({
            isSearching:true
       })

       axios.get(`${API_URL}/api/v1/compare/search?api_key=${API_KEY}&product=${this.state.title}`, {
        headers: {
            "Accept": "application/json"
        }
    }).then(response => {
            console.log(response)
            this.setState({
                products:response.data.data,
                isSearching:false
            }) 
        })
        .catch(err => {
            this.setState({
                isSearching:false
            })
        })

       
   }

       
    render(){

        const {classes} = this.props;
        let  Listing;
       
        if(this.state.isSearching){
            Listing = (
                <div className={classes.root} style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                  <CircularProgress />
                </div>
                
            )
        }

        else if(this.state.products!==[]){
            Listing =  this.state.products.map((item, index) => {
                return (
                    <TableRow role="checkbox" tabIndex={-1} key={index}>
                        <TableCell  scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell  scope="row" align="left">
                            <b>{item.product_title}</b>
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            <img src={item.product_image} height="35px" />
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            {item.product_category}
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            {item.product_lowest_price}
                        </TableCell>
                        <TableCell scope="row" align="center">
                            {item.product_rating}
                        </TableCell>
                        
                        
                    </TableRow>
                )
            })
        }

       

        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
               
                <Typography style={{color:'white'}}>
                  Dashboard
               </Typography>

               
                
            </div>
            <div style={{
                
               
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                padding:'0.5rem',
                }}>
                <CountComponent 
                   category={this.state.category}
                   customer={this.state.customer}
                />
            </div>
            <div style={{display:'flex'}}>
                <div style={{padding:'1rem'}}>
                    <Paper elevation={3} style={{ padding:'1rem', width:'400px', minHeight:'200px', display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}>
                    <Typography style={{padding:'10px', fontSize:'1.2rem', fontWeight:'bold'}}>Add Category</Typography>
                    <div style={{width: '250px'}} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            label="Enter Category"
                            name="title"
                            type="text"
                            autoFocus
                            onChange = {(event) => this.setState({title:event.target.value})}
                        />
                        
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button
                            type="submit"
                           
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            disabled = {this.state.title === '' ? true : false}
                            style={{margin:'10px 0', width:'120px'}}
                            onClick={this.addCategory}
                        >
                        {this.props.isLoading ? <CircularProgress /> : 'Add' }
                        </Button>

                        <Button
                            type="submit"
                            
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled = {this.state.title === '' ? true : false}
                            onClick = {this.handleSearch}
                            style={{margin:'10px 0', width:'120px'}}
                        >
                        Check
                        </Button>
                        </div>

                       
                        </div>
                    </Paper>
            </div>

            <div style={{padding:'1rem'}}>
           
                       
                        <div style={{height:'100vh',width:'600px',background:'white'}}>
                        <Paper elevation={1} style={{height:'80vh'}} >
                            <TableContainer className={classes.container} style={{overflowY:'auto',width:'600px',  background:'white', height:'90vh'}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead style={{fontWeight:'bold'}}>
                                    
                                        <TableRow>
                                    
                                            <TableCell>S.No</TableCell>
                                            <TableCell align="center">Title</TableCell>
                                            <TableCell align="center">Image</TableCell>
                                            <TableCell align="center">Category</TableCell> 
                                            <TableCell align="center">Price</TableCell>   
                                            <TableCell align="center">Rating</TableCell> 
                                                    
                                        </TableRow>
                                   
                                </TableHead>
                                
                                <TableBody >
                                   {Listing}
                                </TableBody>
                               
                            </Table>
                            </TableContainer>

                           
                        </Paper>
                        </div>


                       
            </div>
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Dashboard);