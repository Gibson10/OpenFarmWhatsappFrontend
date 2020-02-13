
import React,{Component} from 'react';
import { Col, Row } from 'antd';
import {Container} from 'react-bootstrap';

class NotFound extends Component {
render(){

return(
<div className="themecolor1" style={{padding: '30px' }}>
    <Container>
        <h2>
            404 Error! No page Found.
        </h2>
    </Container>
 </div>
)
}
}

export default NotFound;