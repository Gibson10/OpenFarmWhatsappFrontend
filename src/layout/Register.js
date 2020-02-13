import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import  './Login.scss';
import {Row,Col, Form, Input, Button, Select, Checkbox} from 'antd';
import { toast } from 'react-toastify';
import {register} from '../services/Api'

const FormItem = Form.Item;
const Option = Select.Option;



  toast.configure();
class AppRegister extends Component  {
	constructor(props){
	super(props);
	this.state={
	username:'', 
	password:'',  
	visible: false, 
	recovermail:'', 
	error:false, 
	showpassword:false, 
	remember:false , 
	number:'',
	code:''};
	
	this.showModal = () => this.setState({ visible: true, }); 
	this.handleOk = (e) => this.setState({ visible: false, });	
	this.handleCancel = (e) =>  this.setState({ visible: false, recovermail:'' , error:false});
	this.showPass= ()=> this.setState({showpassword: !this.state.showpassword});
	
	this.handleSubmit = (e) => {
		e.preventDefault();		
		this.props.form.validateFields(async (err, values)  => {
		  if (!err) {

			const auth1 = {
				...values,
			}	
		const RegisterValue= await register(auth1);
        console.log(RegisterValue);
		toast(RegisterValue.message,{type:'success'})
		this.props.history.push("/login");	 		
		  }
		});
	};
	  
	this.validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
		  form.validateFields(['confirm'], { force: true });
		}
		callback();
	};
	this.compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Two passwords that you enter is inconsistent!');
		} else {
		  callback();
		}
	}
	this.handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	this.handleNumberChange = (rule, value, callback) => {
		const number = parseInt(value || 0, 10);
    if (isNaN(number)) {
      callback('Please enter valid mobile number!');
    }else {
		  callback();
		}    
	};	 
}
	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Row type="flex" className="basicpage" justify="space-around" align="middle" style={{minHeight:'100vh'}}>
				<Col  className="basicbox">
					
						<div className="mainimg registerimg"></div>
						<div className="mainform">
							<Form onSubmit={this.handleSubmit} className='login_form'>
									<FormItem>
										{getFieldDecorator('fullName', { rules: [{ required: true, message: 'Please input your Business Name!' }], })(
										<Input  placeholder="User Name" />
										)}
									</FormItem>
									<FormItem>
										{getFieldDecorator('username', { rules: [{type: 'email', message: 'The input is not valid E-mail!'},{ required: true, message: 'Please input your email!' }],	})(
										<Input  placeholder="Your Email Address" />
										)}
									</FormItem>
									<FormItem>
										{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!', }, { validator: this.validateToNextPassword,}],})(
										<Input alt="" type={this.state.showpassword ? "text":"password"} placeholder="Password" className="eyeicon" minLength={6} maxLength={20}/>
										)}
									</FormItem>
									<FormItem >
										{getFieldDecorator('confirm', { rules: [{ required: true, message: 'Please confirm your password!', }, {validator: this.compareToFirstPassword,}],})(
										<Input alt="" type={this.state.showpassword ? "text":"password"} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} className="eyeicon"/>
										)}
									</FormItem>
									<FormItem className="m-b0">
										{getFieldDecorator('term', {
											valuePropName: 'checked',
											initialValue: true,
										})(
											<Checkbox>Terms and Conditions</Checkbox>
										)}
									</FormItem>
									<FormItem className="m-b0">
										<Button type={'primary'}  htmlType="submit" >  
										Register
										</Button>
									</FormItem>
									Or <Link to={'/login'}>Already have account</Link>
								</Form>
						</div>
				</Col>
			</Row>
		);
   }
} 


export default(Form.create()(AppRegister));