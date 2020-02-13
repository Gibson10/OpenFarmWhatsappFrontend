import React, { Component }  from 'react';

import { Row, Col, Menu, Icon, Avatar,Dropdown} from 'antd';
import './AppHeader.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

const SET_TOKEN='SET_TOKEN';

  toast.configure();
class AppHeader extends Component  {
    
    constructor(props){
      super(props)

          this.state = {
            collapsed: false,
          };
        
          this.toggle = () => {
            this.setState({
              collapsed: !this.state.collapsed,
            });
          };
          
          
          
        
        this.logout= ()=>{
          localStorage.removeItem(SET_TOKEN);

        };

      }
render() {
    const menu = (
    <Menu onClick={this.onMenuClick}>
            <Menu.Item key="setting"><Link to="/profile"><Icon type="profile" theme="outlined" /> Profile</Link></Menu.Item>
            <Menu.Item onClick={()=>this.logout()} key="logout"><Link to="/login"><Icon type="logout" theme="outlined" /> Logout</Link></Menu.Item>
      </Menu>
      );
      
    return (
      <div>
    <Row style={{color:'#fff', height:61}} type="flex" justify="space-between">
        <Col md={6} lg={12} className="logoDiv" >
            
      
        </Col>

        <Col span={16} className="topmenu">
            <Menu className="headtoplink" mode="horizontal" >   
               
                <Menu.Item>
                <Dropdown overlay={menu}><a className="ant-dropdown-link" ><Avatar style={{ color: '#2d1582', }} icon="user" /></a></Dropdown>
                </Menu.Item>
            </Menu>
        </Col>

    </Row>

 
   </div>
    );
}
}

export default withRouter(AppHeader);

