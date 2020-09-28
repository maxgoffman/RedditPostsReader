import React from 'react';
import { Row, Col, Card, CardImg } from 'reactstrap';
import moment from 'moment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import styles from './RedditPostsListComponent.module.scss';


/** 
  * @desc Reddit Posts List Component:
  * Displays a list of reddit cards.
  * @author Maximiliano Goffman
  * @required bootstrap 4
*/
function RedditPostsListComponent(props) {
    //render post list
    return (
        <Col xs={3} className={`${styles.columnBack} pr-0`}>
            <div className={styles.postlist}>
                <div className={`${styles.listheader}`}>
                    <h4 className="mb-0">Reddit Posts</h4>
                </div>
                <ListItems 
                    posts={props.postList} 
                    toggleRedditPostDetails={props.toggleRedditPostDetails} 
                    removePost={props.removePost} 
                />
                <Row className={`${styles.listfooter} mx-auto`}>
                    <h4 onClick={() => props.removeAllPosts()}>Dismiss All</h4>
                </Row>
            </div>
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
            //using moment.js library magic to format time text
            const diffTime = moment.unix(item.data.created_utc).fromNow();
            //add unread icon if needed
            const unreadIcon = (item.read ?
                <React.Fragment></React.Fragment> :
                <FontAwesomeIcon icon={faCircle} size="xs" />
            );
            //asks if thumbnail is image file
            const postImage = ( item.data.thumbnail.match(/\.(jpeg|jpg|gif|png)$/) != null ?
                (
                    item.data.preview ?
                    //use smallest thumbnail preview resolution
                    <Col 
                        className={`pl-0 pr-1 text-left`}
                        style={
                            {
                                maxWidth:`${item.data.preview.images[0].resolutions[0].width}px`,
                                maxHeight:`${item.data.preview.images[0].resolutions[0].height}px`
                            }
                        }
                    >
                        <CardImg src={item.data.thumbnail} />
                    </Col> :
                    //there is no preview show real thumbnail dimensions
                    <Col 
                        className={`pl-0 pr-1 text-left`}
                        style={
                            {
                                maxWidth:`${item.data.thumbnail_width}px`,
                                maxHeight:`${item.data.thumbnail_height}px`
                            }
                        }
                    >
                        <CardImg 
                            src={item.data.thumbnail}
                        />
                    </Col>
                ) :
                //there is no thumbnail, don't show anything
                <React.Fragment></React.Fragment>
            );
            return (
                <CSSTransition key={index} classNames="dismiss" timeout={300}>
                    <Card 
                        tag="a" 
                        onClick={() => props.toggleRedditPostDetails(item)} 
                        style={{ cursor: "pointer" }} 
                        className={`text-center ${styles.post}`}>
                        <Row className="mb-1 pl-1 text-left">
                            <Col>
                                {unreadIcon}<span className={styles.author}> {item.data.author}</span>
                            </Col>
                            <Col className={`d-flex ${styles.time}`}>
                                <span>{diffTime}</span>
                            </Col>
                        </Row>
                        <Row className="mb-1 ml-1">
                            {postImage}
                            <Col className="px-0 d-flex">
                                <span 
                                    className={`my-auto ${styles.title} text-left mr-3`}
                                >
                                    {item.data.title}
                                </span>
                            </Col>
                        </Row>
                        <Row className={`mb-1 ${styles.postfooter}`}>
                            <Col className="text-left">
                                <span 
                                    onClick={(event) => removePost(event, item)}
                                >
                                    <FontAwesomeIcon 
                                        icon={faTimesCircle} 
                                        style={{fontSize:'1.25em'}} 
                                    />
                                    <span className={styles.postdismiss}> Dismiss Post</span>
                                </span>
                            </Col>
                            <Col className="d-flex">
                                <span>{item.data.num_comments} comments</span>
                            </Col>
                        </Row>
                    </Card>
                </CSSTransition>
            );
        });
    return (
        <div className={`${styles.listcontent}`}>
            <TransitionGroup>
                    {items}
            </TransitionGroup>
        </div>
    );
}

export default RedditPostsListComponent;