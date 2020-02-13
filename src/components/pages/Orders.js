/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import {Table, Card,Tabs,Button,Icon,Input} from 'antd'; 
import { withRouter } from 'react-router-dom';
import {getOrders} from '../../services/Api'
import Highlighter from 'react-highlight-words';
import { trackPromise } from 'react-promise-tracker';


class Orders extends Component {	
	constructor(props){
		super(props)
    this.state = {orders:[],
             searchText: '',
             searchedColumn: '',
    };



    this.getCustomers =(phone)=>{
      
      this.props.history.push({
        pathname: '/viewcustomer',
          id: phone,
      }); 

    }
    this.getVendor =(phone)=>{
      
      this.props.history.push({
        pathname: '/viewvendor',
          phone: phone,
      }); 

    }
	

	}   

    async componentDidMount(){		   
            trackPromise(
              this.getOrders().then(result=>{
               this.setState({ 
                 orders:result,
               })
          }	
          )
          )
        }

    async getOrders(){
           const Orders= await getOrders();
            console.log(Orders);
           return Orders;
        }

    

      
      getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      });

      handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

	  
	render() {  
		const total = this.state.orders.length;
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
            ...this.getColumnSearchProps('customerName'),
			key: 'customerName',
		
			render: (text) => (
				<span>
				<a style={{color:'green'}} onClick={()=>this.otherpage(text)}> {text}</a>
			
				</span>
			),
      },
      {
        title: 'Customer Number',
        dataIndex: 'customerPhone',
        key: 'customerPhone',
        render: (text) => (
          <span>
          <a style={{color:'green'}} onClick={()=>this.getCustomers(text)}> {text}</a>
        
          </span>
        ),           
      
        },
			{
			title: 'Product Name',
			dataIndex: 'productName',
			key: 'productName',
			render: text => <a style={{color:'#555555'}}>{text}</a>,
      },
      {
        title: 'Product Quantity',
        dataIndex: 'productQuantity',
        key: 'productQuantity',
        render: text => <a style={{color:'#555555'}}>{text}</a>,
        },
		
      {
        title: 'Price  Paid',
        dataIndex: 'pricePaid',
        key: 'pricePaid',
        render: text => <a style={{color:'#555555'}}>{text}</a>,            
      
        },
			{
				title: 'Vendor Name',
                dataIndex:'vendorName',
                ...this.getColumnSearchProps('vendorName'),
				key: 'vendorName',
				render: text =><a style={{color:'#555555'}}>{text}</a> 	
			},
			{
			title: 'Vendor Number',
			dataIndex:'vendorPhone',
			key: 'vendorPhone',
      render: (text) => (
				<span>
				<a style={{color:'green'}} onClick={()=>this.getVendor(text)}> {text}</a>
			
				</span>
			),
    },		
    {
			title: 'Vendor Location',
			dataIndex:'vendorLocation',
			key: 'vendorLocation',
			render: text =><a style={{color:'#555555'}}>{text}</a> 	
		},	  
		];
		return (
	<div>

          <Card title="All Orders"  bodyStyle={{padding:0}} loading={false}>
					<div className="table-responsive">
					<Table columns={columns} dataSource={this.state.orders} scroll={{ x: 1200 }} limit={10} onPress={()=>this.viewCoin()} pagination={{size:'small', total:total, showTotal:total => `Total ${total} Orders`}}  />
					</div>
				</Card>
	
	</div>
		);
	}
}
export default withRouter(Orders);

