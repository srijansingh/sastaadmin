import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CustomerComponent from "./component/customerComponent";
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BASE_URL } from "../../config/baseUrl";

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
  

class  Customer extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            customer:[],
            count:0,
            offset: 0,
            perPage: 10,
            currentPage: 0
           
        };
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }

    componentDidMount(){
        this.receivedData()

    }

    receivedData = () => {
        this.setState({
            isLoading:true
        })


        fetch(`${BASE_URL}/customer`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch customer data')
            }
            return res.json();
        })
        .then(response => {
                console.log(response)
                this.setState({
                    customer : response.data,
                    count:response.data.length,
                    pageCount: Math.ceil(response.data.length / this.state.perPage),
                    isLoading:false
                })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false
            })
            alert(err)
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
       
    render(){

        const {classes} = this.props;
        
        const customers = this.state.customer.map((list, index) => {
            return <CustomerComponent 
            key={index} index={index} 
            name={list.name} 
            email={list.email}
            

             />
        })

        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
                    
                    <Typography style={{color:'white'}}>
                        Customers
                    </Typography>

                    <Typography style={{color:'white'}}>
                    {
                        this.state.isLoading ? 'Loading...' : this.state.count +' Customers'
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
                <div style={{ width:'600px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                   <TableContainer className={classes.container} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{fontWeight:'bold'}}>
                            <TableRow>
                                
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                

                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                </div>

                
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Customer);