import React, { Component } from 'react';
import { Modal,Form, Select, Input, Button } from 'antd';
import {getVendors} from '../../services/Api'
const { Option } = Select;

class ProductModal extends Component {
constructor(props){
    super(props)
      this.state={
        vendor:[],
      };

      this.handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };

      this.handleSelectChange = value => {
        console.log(value);
        this.props.form.setFieldsValue({
          value
        });
      };
    }

    async componentDidMount(){
      const Vendor= await getVendors()
      console.log("VENDORS",Vendor)
      this.setState({
        vendor:Vendor
      })
    }

  render() {
    const { visible, onCancel, onCreate, form, receiversWallet } = this.props;
    const { getFieldDecorator, } = form;
    return (
   
        <Modal className="login_block" visible={visible} title="Add Product" okText="Recover" onCancel={onCancel} onOk={onCreate} footer={null} width={900}>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Product Name ">
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: 'Please Input Product Name' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Product Price">
          {getFieldDecorator('productPrice', {
            rules: [{ required: true, message: ' Please input the price of the product' }],
          })(<Input  />)}
        </Form.Item>
        <Form.Item label="Product Category">
          {getFieldDecorator('productCategory', {
            rules: [{ required: true, message: 'Please select a Product Category!' }],
          })(
            <Select
              placeholder="Please select a Product Category!'"
              onChange={this.handleSelectChange}
            > 
              <Option value="food">Food</Option>
              <Option value="grocery">Grocery</Option>
            
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Vendor ">
          {getFieldDecorator('vendor', {
            rules: [{ required: true, message: 'Please select a vendor!' }],
          })(
            <Select
              placeholder="Please select a vendor!'"
              onChange={this.handleSelectChange}
            > 
            {this.state.vendor.map((item, index) => (
              <Option value={JSON.stringify({phone:item.vendorPhone,name:item.vendorName, location:item.vendorLocation})}>{item.vendorName}</Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        {/* <Form.Item label="Vendor Name">
          {getFieldDecorator('vendorName', {
            rules: [{ required: true, message: ' Please input the price of the product' }],
          })(<Input  />)}
        </Form.Item>
        <Form.Item label="Vendor Location">
          {getFieldDecorator('vendorLocation', {
            rules: [{ required: true, message: ' Please enter your location' }],
          })(<Input  />)}
        </Form.Item>

        <Form.Item label="Vendor Number">
          {getFieldDecorator('vendorNumber', {
            rules: [{ required: true, message: ' Please enter the Vendor Number' }],
          })(<Input  />)}
        </Form.Item> */}
        <Form.Item wrapperCol={{ span: 12 }}>
          <Button  onClick={onCreate} type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    );
  }
}

export default (Form.create()(ProductModal));