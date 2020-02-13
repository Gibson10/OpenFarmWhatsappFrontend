import React, { Component } from 'react';
import {Card, Form, Input, Button, message, Tooltip,Row, Col} from 'antd';
import { Tabs ,Popover} from 'antd';

import {profileGet} from '../../services/Api'
const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
  }

const FormItem = Form.Item;
class Profile extends Component {
	constructor(props){
	super(props)
	this.state={
	 username:'',
	 password:'',  
	 visible: false, 
	 email:'', 
	 wallets:[],
	 user:{},
	 recovermail:'', 
	 error:false, 
	 showpassword:false, 
	 token:this.props.match.params.token , 
	 loading: false, 
	 numberChar:false, 
	 capitalChar:false, 
	 smallChar:false, 
	 specialChar:'',
	 charlength:false, 
	 TooltipShow:false,}
	 this.submit = this.submit.bind(this);
	}

	onCopyValue () {
		this.setState({
			copied:true,
		});

	  }
	  async submit(ev) {
	
	  }
	  
	showModal () { this.setState({ visible: true, }) }; 
	handleOk(e) {this.setState({ visible: false, })};	
	handleCancel(e){this.setState({ visible: false, recovermail:'' , error:false})};	
	showPass() {this.setState({showpassword: !this.state.showpassword})};

	handleConfirmBlur (e)  {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	compareToFirstPassword  (rule, value, callback) {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Please enter same password');
		} else {
		  callback();
		}
	}
	
	async componentDidMount(){
		const Profile= await profileGet();
		console.log("PROFILE",Profile);
		// console.log("JINA NDI HII",Profile.data)
		  this.setState({
			  user:Profile.user,
		  });
		}
		
	
	 handleSubmit  (e)  {
		e.preventDefault();		
		this.props.form.validateFields((err, values) => {
		  	if (!err) {			  
				if(values.password === values.confirm)
					{
						console.log(values)
						delete values["confirm"];
						message.success('Password Changed!')
						this.props.form.resetFields();
					}
				else message.error('Password does not match the confirm password.')			
		  	}
		});
	  }
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const { showpassword,numberChar,capitalChar,smallChar,specialChar,TooltipShow,charlength} =this.state;
		const PassPattern = <ul className="PassPattern">
				<li className={capitalChar?'active':''}>At least one capital char</li>
				<li className={smallChar?'active':''}>At least one small char</li>
				<li className={numberChar?'active':''}>At least one numeric</li>
				<li className={specialChar ?'active':''}>At least one special char</li>
				<li className={charlength?'active':''}>Minimum 6 char required</li>
			</ul>;
			

	return (
		<div>
<Tabs defaultActiveKey="1" onChange={callback}>
	 <TabPane tab="Profile" key="1">	
	  <Row gutter={15} justify="space-between" align="middle">
                <Col span={12} md={{span:6}} lg={{span:6}}>
					<Card 
					cover={
						<img
							alt="example"
							src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
						/>
						}
					hoverable className="dashCard" bordered={false} style={{padding:0, marginBottom:15}} >
					<strong>
					   <h4 style={{color:"#2d1582"}}>Name</h4>
					</strong>		
					   <p style={{color:'#3f8600'}}>{this.state.user.fullName}</p>     
                    </Card>  
                </Col>
				
				<Col span={12} md={{span:12}} lg={{span:18}}>
					<Card title="Profile Update" bordered={false} style={{ marginBottom:15,}} >
						<Form onSubmit={this.handleSubmit} >
						<FormItem>						
								{getFieldDecorator('Fullname', { initialValue:this.state.user.fullName,rules: [{ required: true, message: 'Please enter your Fullname!', },] })(
									<Input  value={this.state.username} placeholder="Username" maxLength={20}/>
								)}
							</FormItem>
							<FormItem>						
								{getFieldDecorator('oldpassword', { rules: [{ required: true, message: 'Please enter your old password!', },] })(
									<Input  type={"password"} placeholder="Old Password" maxLength={20}/>
								)}
							</FormItem>
							<FormItem>
								<Tooltip placement="bottomLeft" title={PassPattern} trigger={'focus'} className="intooltip" visible={TooltipShow}>
								{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!', }, ] })(
									<Input  type={showpassword ? "text":"password"} placeholder="Password" className="eyeicon" minLength={6} maxLength={20} suffix={<img src={this.state.showpassword ? require('../../images/eye-off.svg'):require('../../images/eye.svg')} alt="eye"  onClick={()=> this.showPass()} />} onBlur={()=>this.setState({TooltipShow:false})}/>
								)}
								</Tooltip>
							</FormItem>
							<FormItem >
								{getFieldDecorator('confirm', { rules: [{ required: true, message: 'Please confirm your password!', }, {validator: this.compareToFirstPassword,}],})(
								<Input alt="" type={showpassword ? "text":"password"} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} minLength={6} maxLength={20} className="eyeicon" suffix={<img src={this.state.showpassword ? require('../../images/eye-off.svg'):require('../../images/eye.svg')} alt="eye"  onClick={()=> this.showPass()} />}/>
								)}
							</FormItem>
							<FormItem>
								<Button className="themecolor"type='primary'  htmlType="submit" > 
								Update profile
								</Button>
							</FormItem>
						</Form>
					
					</Card>	
				</Col>	
        </Row>		
	</TabPane>

	
</Tabs>
		</div>
	);
  }
}

export default (Form.create()(Profile));