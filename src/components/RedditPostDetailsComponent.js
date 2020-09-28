import React from 'react';
import { Row, Col, Card, CardImg } from 'reactstrap';
import styles from './RedditPostDetailsComponent.module.scss';

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
    //check if image url
    const postImage = (props.itemSelected.data.url.match(/\.(jpeg|jpg|gif|png)$/) != null ?
        //url is an image, show it
        <div 
            className={`${styles.imgContainer} justify-content-center`}
        >
            <img 
                src={props.itemSelected.data.url} 
                alt="" 
                onClick={() => {window.location = props.itemSelected.data.url;}}
            />
        </div>
        :
        (
            //it's not an image, show the thumbnail
            props.itemSelected.data.thumbnail.match(/\.(jpeg|jpg|gif|png)$/) != null ?
            <Col className="mx-auto">
                <CardImg src={props.itemSelected.data.thumbnail} className="w-auto h-auto" />
            </Col>
            :
            //there is no thumbnail either
            //don't show anything
            <React.Fragment></React.Fragment>
        )
    );
    
    return (
        <Col>
             <Card
                className={`my-2 text-left ${styles.post}`}>
                <Row>
                    <Col>
                        <h4>{props.itemSelected.data.author}</h4>
                    </Col>
                </Row>
                <Row className="mb-3">
                    {postImage}
                </Row>
                <Row className="mb-3 text-left">
                    <Col>
                        <span>{props.itemSelected.data.title}</span>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}


export default RedditPostDetailsComponent;