import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  './Login.scss';
import { connect } from 'react-redux';
import {Row,Col, Form, Input, Button, message, Tooltip} from 'antd'; 
import { toast } from 'react-toastify';
import {resetpass} from '../services/Api';

const FormItem = Form.Item;

  toast.configure();
class AppReset extends Component  {
	constructor(props){
		super(props)
	this.state={username:'', 
		password:'',  
		visible: false, 
		recovermail:'', 
		error:false, 
		showpassword:false, 
		token:this.props.match.params.token , 
		loading: false, 
		numberChar:false, 
		capitalChar:false, 
		smallChar:false, 
		specialChar:false,
		charlength:false, 
		TooltipShow:false
	}
	
	
	this.showModal = () => this.setState({ visible: true, }); 
	this.handleOk = (e) => this.setState({ visible: false, });	
	this.handleCancel = (e) => this.setState({ visible: false, recovermail:'' , error:false});	
	this.showPass= ()=> this.setState({showpassword: !this.state.showpassword});

	this.handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};
	this.compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Please enter same password');
		} else {
		  callback();
		}
	};
	
	 this.handleSubmit = (e) => {
		e.preventDefault();		
		this.props.form.validateFields( async(err, values) => {
		  	if (!err) {
				const resetValue={
					...values,
					userId: this.props.location.id
				}
				
			
			const ResetValue= await resetpass(resetValue);
			
			console.log(ResetValue);
			toast(ResetValue.message,{type:'success'})
				
		  	}
		});
	  };
	  
	this.validateToNextPassword = (rule, value, callback) => {
		var pass = value;
        let special = /[^\w\s]/g;
		let capital = /^(?=\S*[A-Z])/g;
		let number = /^(?=\S*\d)/g;
		let small = /^(?=\S*[a-z])/g;
		let specChar = special.test(pass);
		if(value !== undefined)
		{
			let showtooltip = number.test(pass) && capital.test(pass) && small.test(pass) && specChar && value.length > 5;
			this.setState({
				specialChar:specChar,
				numberChar:number.test(pass),
				capitalChar:capital.test(pass),
				smallChar:small.test(pass),
				charlength:value.length > 5,
				TooltipShow:!showtooltip
			})
			if (showtooltip || value === '') {
				callback();
			} else{
				callback('Please enter valid password!');
			}
			
		}else
		{callback();}		
	}
}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { showpassword,numberChar,capitalChar,smallChar,specialChar,TooltipShow,charlength} =this.state;
		const PassPattern = <ul className="PassPattern">
				<li className={capitalChar?'active':''}>At least one capital char</li>
				<li className={smallChar?'active':''}>At least one small char</li>
				<li className={numberChar?'active':''}>At least one numeric</li>
				<li className={specialChar?'active':''}>At least one special char</li>
				<li className={charlength?'active':''}>Minimum 6 char required</li>
			</ul>;
		return (
			<Row type="flex" className="basicpage" justify="space-around" align="middle" style={{minHeight:'100vh'}}>
			<Col  className="basicbox">
				<div className="mainimg resetimg"></div>
				<div className="mainform">
					<div className="logo">
	
					</div>
					<Form onSubmit={this.handleSubmit} className='login_form'>
					<FormItem>
						{getFieldDecorator('otp', { rules: [{ required: true, message: 'Please input the OTP!' }], })(
										<Input  placeholder="OTP" />
										)}
									</FormItem>
						<FormItem>
							<Tooltip placement="bottomLeft" title={PassPattern} trigger={'focus'} className="intooltip" visible={TooltipShow}>
							{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!', }, {validator: this.validateToNextPassword,}] })(
								<Input  type={showpassword ? "text":"password"} placeholder="Password" className="eyeicon" minLength={6} maxLength={20} suffix={<img src={this.state.showpassword ? require('./../images/eye-off.svg'):require('./../images/eye.svg')} alt="eye"  onClick={()=> this.showPass()} />} onBlur={()=>this.setState({TooltipShow:false})}/>
							)}
							</Tooltip>
						</FormItem>
						<FormItem >
							{getFieldDecorator('confirm', { rules: [{ required: true, message: 'Please confirm your password!', }, {validator: this.compareToFirstPassword,}],})(
							<Input alt="" type={showpassword ? "text":"password"} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} minLength={6} maxLength={20} className="eyeicon" suffix={<img src={this.state.showpassword ? require('./../images/eye-off.svg'):require('./../images/eye.svg')} alt="eye"  onClick={()=> this.showPass()} />}/>
							)}
						</FormItem>
						<FormItem className="m-b0">
							<Button type={'primary'}  htmlType="submit" >  
							Reset Password
							</Button>
						</FormItem>
						Or <Link to={'/login'}>login</Link>
					</Form>
				</div>
			</Col>
		</Row>
		);
   }
} 
const mapStateToProps = ({ resetPasswordId }) => {
	return {
		resetPasswordId
	}
}
export default connect(mapStateToProps)(Form.create()(AppReset));


