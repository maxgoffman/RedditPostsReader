import React from 'react';
import { Row, Col, Card, CardImg } from 'reactstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';

/** 
  * @desc Reddit Posts List Component:
  * Displays a list of reddit cards.
  * @author Maximiliano Goffman
  * @required bootstrap 4
*/
function RedditPostsListComponent(props) {
    //render post list
    return (
        <Col xs={3}>
            <Row>
                <Col>
                    <h4>Reddit Posts</h4>
                </Col>
            </Row>
            <ListItems 
                posts={props.postList} 
                toggleRedditPostDetails={props.toggleRedditPostDetails} 
                removePost={props.removePost} 
            />
            <Row>
                <Col>
                    <h4 onClick={() => props.removeAllPosts()}>Dismiss All</h4>
                </Col>
            </Row>
        </Col>
    );
}

function ListItems(props) {
    //configure moment for correct relative date conversion
    moment.relativeTimeRounding(Math.floor);
    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24);
    moment.relativeTimeThreshold('d', 7);
    moment.relativeTimeThreshold('w', 4);
    moment.relativeTimeThreshold('M', 12);
    
    const removePost = (e, item) => {
        //stop event propagation to avoid card click
        e.stopPropagation();
        props.removePost(item);
    }
    
    const items = !props.posts ? 
        [] : 
        props.posts.map((item, index, list) => {
            const diffTime = moment.unix(item.data.created_utc).fromNow();
            const unreadIcon = item.read ?
                <React.Fragment></React.Fragment> :
                <FontAwesomeIcon icon={faCircle} />
            return (
                <Card key={index} 
                    tag="a" 
                    onClick={() => props.toggleRedditPostDetails(item)} 
                    style={{ cursor: "pointer" }} 
                    className={`my-2 text-center`}>
                    <Row className="mb-3">
                        <Col>
                            {unreadIcon}<span>{item.data.author}</span>
                        </Col>
                        <Col className="d-flex">
                            <span>{diffTime}</span>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <CardImg top src={item.data.thumbnail}  />
                        </Col>
                        <Col className="d-flex">
                            <span>{item.data.title}</span>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <span onClick={(event) => removePost(event, item)}>Dismiss Post</span>
                        </Col>
                        <Col className="d-flex">
                            <span>{item.data.num_comments} comments</span>
                        </Col>
                    </Row>
                </Card>
            );
        });
    return (<React.Fragment>{items}</React.Fragment>);
}

export default RedditPostsListComponent;