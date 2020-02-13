import React, { Component } from 'react';
import {Table ,Button,Input,Icon} from 'antd';
import {getVendors,addVendors} from '../../services/Api'
import VendorModal from '../Modals/VendorsModal'
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import Highlighter from 'react-highlight-words';

class Vendors extends Component {	
    constructor(props){
        super(props)
		this.state = {
			order:'',
            vendors:[],
            visible:false,
            searchText: '',
            searchedColumn: '',
	};

    this.showModal = () => {
          
        this.setState({ visible: true,}); 
      };
   
    this.saveFormRef = (formRef) =>  this.formRef = formRef;
    this.handleCancel = (e) => this.setState({ visible: false,error:false,paymentModalVisible:false});
    this.handleCreate = () => {     
    const form = this.formRef.props.form;
    form.validateFields( async(err, values) => {
     let data={
        vendorName:values.vendorName,
        vendorLocation:values.vendorLocation,
        vendorNumber:values.vendorNumber
     }

     const VendorsData= await addVendors(data);
     toast(VendorsData.message)
    });
  };
    }  
    
    async componentDidMount(){		   
        trackPromise(
          this.getVendors().then(result=>{
           this.setState({ 
            vendors:result,
           })
      }	
      )
      )
    
    }

    async getVendors(){
       const Vendors= await getVendors();
        // console.log(Orders);
       return Vendors;
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
        const total = this.state.vendors.length;
        const limit = 10;
        const columns = [
            {title: 'Date', dataIndex: 'createdAt', key: 'createdAt', width:105, 
            },
            {title: 'Vendor Name', dataIndex: 'vendorName', key: 'vendorname',
            ...this.getColumnSearchProps('vendorName'),
                render: (text) =><a style={{color:'green'}}>{text} </a>, 
                
            },
            {title: 'Vendor Location', dataIndex: 'vendorLocation', key: 'vendorLocation', },
			// {title: 'Quantity', dataIndex: 'quantity', key: 'quantity', },	
			
            {title: 'Vendor Phone', dataIndex: 'vendorPhone', key: 'vendorPhone',
            ...this.getColumnSearchProps('vendorPhone'), },
		];
	return (
			<div>
		    
             <div style={{float: 'right',paddingBottom:20}}>
                <Button type='primary' onClick={this.showModal}>
                    Add Vendor
                </Button>
                </div>
			    <div className="table-responsive">
					<Table bordered  columns={columns} dataSource={this.state.vendors} className="cardtable" onChange={this.paginationFun} scroll={{ x: 1200 }} rowKey="id" pagination={{size:'small', total:total, pageSize: limit, showTotal:total => `Total ${total} Vendors`}}
					/>
				</div> 

                <VendorModal wrappedComponentRef={this.saveFormRef} visible={this.state.visible} onCancel={this.handleCancel} onCreate={this.handleCreate} />
			</div>
		);
	}
}
export default(Vendors);


