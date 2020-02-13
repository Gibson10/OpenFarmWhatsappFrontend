/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import {Table, Card,Tabs} from 'antd'; 
import { withRouter } from 'react-router-dom';
import {getTransactions} from '../../services/Api'
import { trackPromise } from 'react-promise-tracker';
const { TabPane } = Tabs;

class Transactions extends Component {	
	constructor(props){
		super(props)
	this.state = {transactions:[]};
	
	this.viewCoin = ()=> {
		props.history.push("/viewcoins");
	  };

	this.otherpage=(text)=>{

		 this.props.history.push({
			pathname: '/viewcoin',
			coin: text,
		  });
	 };
	}   

	async componentDidMount(){		   
        trackPromise(
          this.getTransactions().then(result=>{ 
           this.setState({ 
            transactions:result,
           })
      }	
      )
      )
    
    }

    async getTransactions(){
       const Transaction= await getTransactions();
        // console.log(Orders);
       return Transaction;
    }

	  
	render() {  
		const total = this.state.transactions.length;
	const columns = [
		{
			title: 'Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: text => <a style={{color:'#555555'}}>{text}</a>,
		  
		  },
		{
			title: 'Customer Name',
			dataIndex: 'customerName',
			key: 'customerName',
		
			render: (text) => (
				<span>
				<a style={{color:'green'}} onClick={()=>this.otherpage(text)}> {text}</a>
			
				</span>
			),
            },
            {
                title: 'Customer Contact',
                dataIndex: 'customerPhone',
                key: 'customerPhone',
            
                render: (text) => (
                    <span>
                    <a style={{color:'green'}} onClick={()=>this.otherpage(text)}> {text}</a>
                
                    </span>
                ),
				},
				{
					title: 'Product',
					dataIndex:'productName',
					key: 'productName',
					render: text =><a style={{color:'#555555'}}>{text}</a> 	
				},
				{
				title: ' Price Paid',
				dataIndex: 'pricePaid',
				key: 'pricePaid',
				render: text => <a style={{color:'#555555'}}>{text}</a>,
				},
				{
				title: ' Transaction Type',
				dataIndex: 'transactionType',
				key: 'transactionType',
				render: text => <a style={{color:'#555555'}}>{text}</a>,
				},
				{
				title: 'Vendor Name',
				dataIndex: 'vendorName',
				key: 'vendorName',
				render:text => <a style={{color:'#555555'}}>{text}</a>,      
			
				},
				{
					title: 'Vendor Location',
					dataIndex: 'vendorLocation',
					key: 'vendorLocation',
					render:text => <a style={{color:'#555555'}}>{text}</a>,      
				
				},
				{
					title: 'Vendor Phone',
					dataIndex: 'vendorPhone',
					key: 'vendorPhone',
					render:text => <a style={{color:'#555555'}}>{text}</a>,      
				
				},
					
				
				{
				title: 'Quantity of Product',
				dataIndex:'productQuantity',
				key: 'productQuantity',
				render: text =><a style={{color:'#555555'}}>{text}</a> 	
			},			  
		];
		return (
	<div>
	
                <Card title="All Transactions "  bodyStyle={{padding:0}} loading={false}>
					<div className="table-responsive">
					<Table columns={columns} dataSource={this.state.transactions} limit={10}  scroll={{ x: 1200 }}  onPress={()=>this.viewCoin()} pagination={{size:'small', total:total, showTotal:total => `Total ${total} Transactions`}}  />
					</div>
				</Card>
	
	
	</div>
		);
	}
}
export default withRouter(Transactions);

