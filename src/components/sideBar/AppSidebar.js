import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './AppSidebar.scss'
import { Menu, Icon,Layout } from 'antd';
const { SubMenu } = Menu;

const {  Sider } = Layout;

const menu = [
	{path:`/`, name:'Home', icon:'dashboard'},	
	{path:`/products`, name:'Products' , icon:'switcher'},
	{path:`/vendors`, name:'Vendors' , icon:'user-add'},
	{path:`/transactions`, name:'Transactions', icon:'transaction'},
	{path:`/orders`, name:'Orders', icon:'book'},
	{path:`/profile`, name:'Profile' , icon:'profile'},
	
	
]

class AppSidebar extends Component {
	render() {
		const {location} = this.props;
		const pathSnippets = location.pathname.split('/').filter(i => i);
		const pathval = pathSnippets[pathSnippets.length - 1]  || '/';		
		
		return (
			<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					left: 0,
					xs: '480px',
					sm: '576px',
					md: '768px',
					lg: '992px',
					xl: '1200px',
					xxl: '1600px',
				}}
				>
			<div style={{paddingTop:50}}>

			<Menu mode="inline" defaultSelectedKeys={[pathval]} defaultOpenKeys={['']} selectedKeys={[pathval]} className="sidemenu"  >
				
				{menu.map((item) => {
					if (item.children && item.children.some(child => child.name)) {
						return(	<SubMenu className="submenu" key={item.name} title={<span><img src={item.img} alt={item.name}/> {item.name}</span>} >
							{item.children.map((val) => {
								return <Menu.Item key={val.path}><Link to={val.path}>
									{val.name}</Link></Menu.Item>
							})}
						</SubMenu>)
					} else {
					return (<Menu.Item key={item.path}><Link to={item.path}>
					{item.img ? <img src={item.img} alt={item.name}/> : <Icon type={item.icon} theme="outlined" />}
					 {item.name}</Link></Menu.Item>);
					}
					})
				}			
			</Menu>
			</div>
		</Sider>
		);
	}
}
export default AppSidebar;
