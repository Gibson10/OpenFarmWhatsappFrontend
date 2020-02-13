import React, { Component } from 'react';
import {Table ,Button,Input,Icon} from 'antd';
import {getCustomerByPhone} from '../../../services/Api'
import VendorModal from '../../Modals/VendorsModal'
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import Highlighter from 'react-highlight-words';

class Customers extends Component {	
    constructor(props){
        super(props)
		this.state = {
			order:'',
            customerdata:[],
            visible:false,
            searchText: '',
            searchedColumn: '',
	};

    

    }  
    
    async componentDidMount(){		 

        trackPromise(
          this.getCustomer().then(result=>{
           this.setState({ 
            customerdata:result,
           })
      }	
      )
      )
    
    }

    async getCustomer(){
      const number={phone:this.props.location.phone}

       const CustomerData= await getCustomerByPhone(number);
        // console.log(Orders);
       return CustomerData;
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
        const total = this.state.customerdata.length;
        const limit = 10;
        const columns = [
            {title: 'Date', dataIndex: 'createdAt', key: 'createdAt', width:105, 
            },
            {title: 'Customer Name', dataIndex: 'customerName', key: 'customerName',
            ...this.getColumnSearchProps('customerName'),
                render: (text) =><a style={{color:'green'}}>{text} </a>, 
                
            },
            {title: 'Customer Phone', dataIndex: 'customerNumber', key: 'customerNumber',
            ...this.getColumnSearchProps('customerPhone'), },
            {title: 'Customer Location', dataIndex: 'customerLocation', key: 'customerLocation', },
            {title: 'Product Ordered', dataIndex: 'productName', key: 'productName', },
            {title: 'Price Paid', dataIndex: 'pricePaid', key: 'pricePaid', },
		
			
            
		];
	return (
			<div>
		    
             
			    <div className="table-responsive">
					<Table bordered  columns={columns} dataSource={this.state.customerdata} className="cardtable" onChange={this.paginationFun} scroll={{ x: 1200 }} rowKey="id" pagination={{size:'small', total:total, pageSize: limit, showTotal:total => `Total ${total} Transactions`}}
					/>
				</div> 


			</div>
		);
	}
}
export default(Customers);


