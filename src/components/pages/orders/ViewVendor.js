import React, { Component } from 'react';
import {Table ,Button,Input,Icon} from 'antd';
import {getVendorByPhone} from '../../../services/Api'
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import Highlighter from 'react-highlight-words';

class ViewVendor extends Component {	
    constructor(props){
        super(props)
		this.state = {
			order:'',
            vendordata:[],
            visible:false,
            searchText: '',
            searchedColumn: '',
	};

    

    }  
    
    async componentDidMount(){		 

        trackPromise(
          this.getVendor().then(result=>{
           this.setState({ 
            vendordata:result,
           })
      }	
      )
      )
    
    }

    async getVendor(){
      const number={phone:this.props.location.phone}
       const VendorsData= await getVendorByPhone(number);
        console.log(VendorsData);
       return VendorsData;
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
        const total = this.state.vendordata.length;
        const limit = 10;
        const columns = [
            {title: 'Date', dataIndex: 'createdAt', key: 'createdAt', width:105, 
            },
            {title: 'Vendors Name', dataIndex: 'vendorName', key: 'customerName',
            ...this.getColumnSearchProps('customerName'),
                render: (text) =><a style={{color:'green'}}>{text} </a>, 
                
            },
            {title: 'Vendor Phone', dataIndex: 'vendorPhone', key: 'vendorPhone',
            ...this.getColumnSearchProps('vendorPhone'), },
            {title: 'Product Ordered ', dataIndex: 'productName', key: 'productName', },
            {title: 'Product Price', dataIndex: 'pricePaid', key: 'pricePaid', },

			
            
		];
	return (
			<div>
		    
             
			    <div className="table-responsive">
					<Table bordered  columns={columns} dataSource={this.state.vendordata} className="cardtable" onChange={this.paginationFun} scroll={{ x: 1200 }} rowKey="id" pagination={{size:'small', total:total, pageSize: limit, showTotal:total => `Total ${total} Transactions`}}
					/>
				</div> 


			</div>
		);
	}
}
export default(ViewVendor);


