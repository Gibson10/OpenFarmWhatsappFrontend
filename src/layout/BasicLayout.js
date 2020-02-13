import React, { Component } from 'react';
import './BasicLayout.scss';
import AppSidebar from '../components/sideBar/AppSidebar'
import AppHeader from '../components/appHeader/AppHeader'
import SubRoute from '../components/subRoute/SubRoute'
import { Layout } from 'antd';
const {  Content, Sider } = Layout; 
//This class holds the Basic Layout
class BasicLayout extends Component {
constructor(props){
	super(props)
	this.state = { collapsed: false, broke:false, mobileview:''};
	this.toggle = () => {
		if(this.state.mobileview) {
			this.setState({
				collapsed: !this.state.collapsed,
			  });
		}
	};
	this.sidebarFun=()=> this.state.mobileview ? this.toggle : null;	
	this.brokenFun = (val)=>{
		this.setState({mobileview:val})
		console.log(this.state.mobileview)
		if(val)
			{if(!this.state.collapsed) 
				this.toggle()}
		if(!val)
			{if(this.state.collapsed)
				this.toggle()}
	}
}
	render() {
		return (
			<div>
			
			<Layout>
			<Sider className="sidebarDiv" width={265} breakpoint="sm" collapsedWidth="0" onBreakpoint={(broken) => this.brokenFun(broken)} collapsed={this.state.collapsed} onClick={this.toggle}>
						<AppSidebar {...this.props} /> 
					</Sider>
				<Layout>
					
					<header className="headerdiv">
					<AppHeader/>
				</header>
					<Content className="contentDiv">						
						<SubRoute/>
					</Content >
				</Layout>
			</Layout>
			</div>
		);
   	}
} 
export default (BasicLayout);

