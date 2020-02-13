import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ForgotForm from '../components/forgot/Forgot';
import Apploader from '../components/loader/Loader'
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './Login.scss';
import {login} from '../services/Api';
import {forgot} from '../services/Api';
import auth from '../components/protectedRoute/Auth';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

const FormItem = Form.Item;
const SET_TOKEN='SET_TOKEN'

toast.configure();
class AppLogin extends Component  {
constructor(props){
     super(props);

		this.state={
			visible: false,
			email:'', 
			password :'',
			recovermail:'' ,
			remember:localStorage.getItem('remember')||false
		};

		this.showModal = () => {
				const form = this.formRef.props.form;
				form.resetFields();
				this.setState({ visible: true,}); 
			};
		this.saveFormRef = (formRef) =>  this.formRef = formRef;
		
		this.handleCancel = (e) => this.setState({ visible: false, recovermail:'' , error:false});

		this.handleCreate = () => {
			const form = this.formRef.props.form;
			form.validateFields( async(err, values) => {


				const resetPasswordValue={
					...values,
				};
				console.log(values)	

			// const response =  await forgot(resetPasswordValue);   
			// if(response.message==="OTP has sent successfully to registered email id!"){
			// 	toast(response.message,{type:'success'})

			// 	this.props.history.push({
			// 		pathname: '/reset',
			// 			id: response.data._id,
			// 	}); 
			// }
				
			});
			};
		
		this.handleSubmit = (e) => {
			e.preventDefault();
				this.props.form.validateFields(async (err, values) => {
					if (!err) {
						const authenticationValues={
							...values,
						};

					  
						const LoginValue= await login(authenticationValues);
						console.log(LoginValue)
						if(LoginValue.message==="Login Successful"){
							
							localStorage.setItem(SET_TOKEN,LoginValue.user.access_token);
								auth.login(() => {
									this.props.history.push("/");
								});
						}else{
							toast(LoginValue.message,{type:'error'})
							this.props.history.push("/login");
							}
					}
				});
		};
}
	render() {
		const props =this.props;
		const { getFieldDecorator } = props.form;			
		return (
			<div>
				<Apploader show={false}/>
				<Row type="flex" className="basicpage" justify="space-around" align="middle" style={{minHeight:'100vh'}}>
					<Col  className="basicbox">
						<div className="mainimg"></div>
						<div className="mainform">
							<div className="logo">
							</div>
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem>
									{getFieldDecorator('username', {
										rules: [{type: 'email', message: 'The input is not valid E-mail!',}, {
											required: true, message: 'Please input your E-mail!',}],
											initialValue : localStorage.getItem('email')
									})(
										<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
									)}
								</FormItem>
								<FormItem>
									{getFieldDecorator('password', {
										rules: [{ required: true, message: 'Please input your Password!' }],
									})(
										<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
									)}
								</FormItem>
								<FormItem>
									{getFieldDecorator('remember', {
										valuePropName: 'checked',
										initialValue: true,
									})(
										<Checkbox>Remember me</Checkbox>
									)}
									<a className="login-form-forgot" onClick={this.showModal}>Forgot password</a>
									<br/>
									<Button type={'primary'} htmlType="submit" className="login-form-button">
										Log in
									</Button>
									<br/>
									Or <Link to={'/register'}>register now!</Link>
								</FormItem>
							</Form>
							
						</div>
						<ForgotForm wrappedComponentRef={this.saveFormRef} visible={this.state.visible} onCancel={this.handleCancel} onCreate={this.handleCreate} />					
					</Col>
				</Row>
			</div>
		);
   }
}


export default withRouter(Form.create()(AppLogin));