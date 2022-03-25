import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List } from 'reactstrap';


function RenderDish({ dish }) {
    if (dish !== null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody className="text-left">
                        <CardTitle tag="h5">{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

function RenderComments({ comments }) {
    if (comments !== null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <List type="unstyled" className="text-left">
                    {comments.comments.map((comment) => {
                        return (
                            <li key={comment.id} className="mb-1">
                                <p>{comment.comment}</p>
                                <p>--{ comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    }) }
                </List>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if(props.dish !== undefined) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish} />
                </div>
            </div>
        );
    }
}

export default DishDetail