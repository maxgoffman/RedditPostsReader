import React from 'react';
import { Row, Col, Card, CardImg } from 'reactstrap';

/** 
  * @desc Reddit Post Details Component:
  * Displays author, image and title.
  * @author Maximiliano Goffman
  * @required bootstrap 4
*/
function RedditPostDetailsComponent(props) {
    //render post list
    if (!props.itemSelected) {
        return (<React.Fragment></React.Fragment>);
    }

    return (
        <Col xs={"auto"}>
             <Card
                tag="a" 
                style={{ cursor: "pointer" }} 
                className={`my-2 text-center`}>
                <Row>
                    <Col>
                        <h4>{props.itemSelected.data.author}</h4>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <CardImg top src={props.itemSelected.data.thumbnail}  />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <span>{props.itemSelected.data.title}</span>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}


export default RedditPostDetailsComponent;