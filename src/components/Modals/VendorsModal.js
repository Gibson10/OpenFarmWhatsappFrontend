import React, { Component } from 'react';
import { Modal,Form, Select, Input, Button } from 'antd';

const { Option } = Select;

class VendorModal extends Component {
constructor(props){
    super(props)
    //   this.state={
    //     wallets:[],
    //   };

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
    
    
    }

  render() {
    const { visible, onCancel, onCreate, form, receiversWallet } = this.props;
    const { getFieldDecorator, } = form;
    return (
   
        <Modal className="login_block" visible={visible} title="Add Product" okText="Recover" onCancel={onCancel} onOk={onCreate} footer={null} width={900}>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Vendor Name">
          {getFieldDecorator('vendorName', {
            rules: [{ required: true, message: ' Please input the Vendor Name' }],
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
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12 }}>
          <Button  onClick={onCreate} type="primary" htmlType="submit">
            Add Vendor
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    );
  }
}

export default (Form.create()(VendorModal));