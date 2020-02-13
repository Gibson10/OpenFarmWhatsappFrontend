import React, { Component } from 'react';
import { Card, Row, Col ,Popover,Icon,Avatar} from 'antd';   
// import {profileGet} from '../../services/Api'; 
import {totalOrders,TotalTransactions,totalAmountTransacted} from '../../calculations/TransactionCalculations';
import './Style.scss';

const { Meta } = Card;
class Dashboard extends Component { 
    constructor(props){
    super(props)
    this.state={
        short:'',
        mounted:false,
        username:'',
        totalOrders:'',
        totalTransactions:'',
        totalAmountTransacted:'',
        transactions:'',
        amounttransacted:'',
        wallets:[],
    }
}

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  async componentDidMount() {
    const Transactions=await TotalTransactions();
    const Orders = await totalOrders();
    const AmountTransacted= await totalAmountTransacted();

    
    this.setState({
      totalOrders:Orders,
      totalTransactions:Transactions,
      totalAmountTransacted:AmountTransacted,
    })
   
  }

    render() {
        return (
    <div>
        <Row gutter={15}  justify="space-between" align="middle">
                <Col span={12}  style={{paddingTop:10,paddingRight:5}} md={{span:12}} lg={{span:8}}>
                    <Card >
                <Row>
                    <Col lg={12} md={6}>
                    <h6 style={{color:"#2d1582"}}>Amount Transacted</h6>
                      <p>{this.state.totalAmountTransacted} KSH</p>
                    </Col>
                    <Col lg={12} md={6}>
                          <div style={{float: 'right'}}>
                            <Icon type="dollar"  style={{ fontSize: '32px', color: '#08c', align:'left' }} />
                            </div>
                     </Col>
                 
                    </Row> 
                    </Card>
                   
                </Col>
                <Col span={12} style={{paddingTop:10,paddingRight:5}} md={{span:12}} lg={{span:8} }>
                
                <Card >
                <Row>
                    <Col lg={12} md={6}>
                    <h6 style={{color:"#2d1582"}}>Number of Transations</h6>
                     <p>{this.state.totalTransactions}</p>
                    </Col>
                    <Col lg={12} md={6}>
                          <div style={{float: 'right'}}>
                            <Icon type="account-book"  style={{ fontSize: '32px', color: '#08c', align:'left' }} />
                            </div>
                     </Col>
                   
                    </Row> 
                    </Card>
                        
                </Col>
                <Col   style={{paddingTop:10,paddingRight:5}} span={12} md={{span:12}} lg={{span:8}}>		
                <Card >
                <Row>
                    <Col lg={12} md={6}>
                    <h6 style={{color:"#2d1582"}}>Number of Orders</h6>
                    <p>{this.state.totalOrders}</p>
                    </Col>
                    <Col lg={12} md={6}>
                          <div style={{float: 'right'}}>
                            <Icon type="snippets"  style={{ fontSize: '32px', color: '#08c', align:'left' }} />
                            </div>
                     </Col>
                   
                    </Row> 
                    </Card>
            </Col>
        </Row>
        
    </div>
        );
    }
}
export default (Dashboard);

