import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, CircularProgress, IconButton } from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./ViewOrder.css";
import {  Checkbox } from "@material-ui/core";
import  { API_KEY, BASE_URL } from '../../config/baseUrl';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

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
  

class InactiveOrder extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            title:[],
            id:null,
            status:null,
            
            isStarted:false,
            selected:false,
            product:[],
            itemIndex:'',
            checkedBoxes:[]
        };

        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        })

        this.receivedData()
                
    }
    
   
    receivedData = () => {
        this.setState({
            isLoading:true
        });

        fetch(`${BASE_URL}/incategory`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
            console.log(response)
            this.setState({
                title:response.data,
                count:response.data.length,
                pageCount: Math.ceil(response.data.length / this.state.perPage),
                isLoading:false
            }) 
        })
        .catch(err => {
            this.setState({
              isLoading:false
            })
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    handleProduct = (ref, i) => {
        this.setState({
            isStarted:true,
            selected:true,
            itemIndex:i
        });
        console.log(ref)
        fetch(`/api/v1/compare/search?api_key=${API_KEY}&product=${ref}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+ this.props.token
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch')
            }
            return res.json()
        }).then(response => {
            console.log(response)
            this.setState({
                product:response.data,
                isStarted:false
            }) 
        })
        .catch(err => {
            this.setState({
                isStarted:false
            })
        })


    }


    deleteProduct = (ref) => {

        fetch(`${BASE_URL}/category/${ref}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
          .then(response => {
                console.log(response);
                alert("Product Deleted");
                 window.location.reload(false);
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
    }



    handleCheck = (event, id) => {
    
        if(event.target.checked) {
                let arr = this.state.checkedBoxes;
                let ids =`${id}`
                arr.push(ids);
                this.setState = { checkedBoxes: arr};
                console.log(arr)
            } else{
          let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(`${id}`), 1);
          this.setState = {
                    checkedBoxes: items
                }
        }
        
    
      };



      handleUpdateStatus = () => {
        fetch(BASE_URL+'/status/active', {
            method: 'PUT',
            headers : {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body : JSON.stringify({checkedBoxes:this.state.checkedBoxes})
          })
          .then(res => {
            if(res.status !==200 ){
              throw new Error('Could not add to Catalogue')
            }
            return res.json()
          })
          .then(response => {
                console.log(response);
                alert("Product added to catalogue");
                 window.location.reload(false);
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
     
    }
    
    render() {


        let ProductList;

        if(this.state.selected === null){
            ProductList = (
                <div>
                <Paper elevation={3} style={{height:'70vh', width:'100%', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>Click on view to Monitor</div>
                </Paper>
            </div>
            
            );
        }
       else if(this.state.isStarted){
        ProductList= (
            <div >
                <CircularProgress />
            </div>
            )
        }

        else{
            ProductList = this.state.product.map((item, index) => {
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

        const {classes} = this.props;
       
        const order = this.state.title.map((item, index) => {
            return (
                <TableRow key={index} style={this.state.itemIndex === index ? {cursor:'pointer', background:'#f2f2f2'} : {cursor:'pointer', background:'white'}} >
                    <TableCell component="th" scope="row">

                    <Checkbox
                        checked={this.state.checkedBoxes.find(p => p ===  item._id)}
                        value={ item._id}
                        onChange={(event) => this.handleCheck(event, item._id)}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{ border:'1px solid #e6e6e6'}}
                        elevation={0}
                    >
        
                        <Divider orientation="vertical" flexItem />
                    </Checkbox> 

                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                        {item.title}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                        {item.status === 'active' ? <span style={{color:'black',fontWeight:'bold', textTransform:'capitalize'}}>Active</span> : <span style={{color:'#a6a6a6', textTransform:'capitalize'}}>Inactive</span> }
                    </TableCell>
                    <TableCell  component="th" scope="row" align="left">
                                <IconButton size="large" onClick={() => this.handleProduct(item.title, index)}>
                                    <VisibilityIcon color="primary" size="20"  />
                                </IconButton>
                     </TableCell>
                     <TableCell component="th" scope="row" align="left">
                                <IconButton size="large" onClick={() =>{if(window.confirm('Delete the item?')) {this.deleteProduct(item._id)};}}>
                                    <DeleteIcon size="20" color="primary" />
                                </IconButton>
                     </TableCell>
                </TableRow>
            )
        })
        return (
            <div>
                <div>
                <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
                    
                    <Typography style={{color:'white'}}>
                        {
                            this.state.isLoading ? 'Loading...' : this.state.count +' Categories Inactive'
                        } 
                    </Typography>

                    <Typography style={{color:'white'}}>
                        <Button style={{width:'200px'}} size="small" color="secondary" variant="contained" onClick={this.handleUpdateStatus}>Add to Catalog</Button>
                    </Typography>

                </div>

                    <div style={{padding:'1rem',display:'flex', flexDirection:'column'}}>
                      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
                          <Paper elevation={1} style={{ padding:'1rem 0', maxWidth:'450px', height:'90vh', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                            <TableContainer className={classes.container}  >
                                
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead style={{fontWeight:'bold'}}>
                                    <TableRow>
                                        
                                        <TableCell>Select</TableCell>
                                        <TableCell align="left">Category</TableCell>
                                        <TableCell align="right">Status</TableCell>        
                                        <TableCell align="right">Action</TableCell>    
                                        <TableCell align="right">Delete</TableCell>             
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                        
                        </Paper>
                        
                    {
                        this.state.selected 
                        ?
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
                                    {ProductList}
                                </TableBody>
                               
                            </Table>
                            </TableContainer>

                           
                        </Paper>
                        </div>


                        :
                        <Paper elevation={1} style={{height:'90vh', width:'600px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                        <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>Click on view to check products in the category</div>
                        </Paper>
                        
                    }
                    </div>
                       
                    </div>
                    
                </div>

                    

            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(InactiveOrder)


 