import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import '../../layout/Login.scss';
const FormItem = Form.Item;

const ForgotForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      console.log("hahaha",form);
      return (
        <Modal className="login_block" visible={visible} title="Recover Password" okText="Recover" onCancel={onCancel} onOk={onCreate} footer={null} width={300}>
          <Form layout="vertical" className="login_form">
            <FormItem style={{padding:0}}>
            {getFieldDecorator('email', {
								rules: [{type: 'email', message: 'The input is not valid E-mail!'},{required: true, message: 'Please input your email!' }],
							  })(
								<Input placeholder="Your email address" />									
							  )}
            </FormItem>
            <div style={{textAlign:'center', marginTop:10, flex:1,justifyContent: 'space-between',}}>
              <Button type={'primary'} className="login-form-button" onClick={onCreate} style={{maxWidth:150,}}>Recover Password</Button>

        
            </div>
          </Form>
        </Modal>
      );
    }
  }
);
export default ForgotForm;