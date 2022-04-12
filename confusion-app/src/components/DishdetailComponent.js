/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List, Breadcrumb, BreadcrumbItem, Label, Button, Modal, ModalHeader, ModalBody, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            ratingValue: 3
        }

        this.renderDish = this.renderDish.bind(this);
        // this.RenderComments = this.RenderComments.bind(this);
        // this.CommentForm = this.CommentForm.bind(this);

        this.toggleModal = this.toggleModal.bind(this);
        this.handlerShowModal = this.handlerShowModal.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handlerShowModal() {
        this.toggleModal()
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    handlerChange(e) {
        this.setState({ ratingValue: e.target.value })
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.resetFeedbackForm();
        // event.preventDefault();
    }

    renderDish(dish) {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        } else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        } else if (dish !== null) {
            return (
                <div className="col-12 col-md-5 m-1">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody className="text-left">
                            <CardTitle tag="h5">{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                </div>
            );
        }
    }

    render() {
        if(this.props.dish !== undefined) {
            return (
                <div className="container">
                    <div className="row mt-5">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row mb-5">
                        {this.renderDish(this.props.dish)}
                        <RenderComments comments={this.props.comments} addComment={this.props.addComment} dishId={this.props.dish.id} />
                    </div>
                </div>
            );
        }
    }
}

const CommentForm = (props) => {
    return (<>
        <Button className="btn btn-outline-dark" onClick={props.handlerShowModal}>
            <i className="fa fa-pencil"></i> Submit Comment</Button>
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <Form model="feedback" onSubmit={props.handleSubmit}>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="rating">Rating</Label>
                            <Control type="number" model=".rating" id="rating" name="rating"
                                value={props.ratingValue}
                                placeholder="Rating"
                                className="form-control"
                                onChange={props.handlerChange} />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="name">Your Name</Label>
                            <Control.text model=".name" id="name" name="name"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{ minLength: minLength(3), maxLength: maxLength(15) }} />
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 3 characters. ',
                                    maxLength: 'Must be 15 characters or less. '
                                }} />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="message">Your Feedback</Label>
                            <Control.textarea model=".message" id="message" name="message"
                                rows="6"
                                className="form-control">
                            </Control.textarea>
                        </Col>
                    </Row>
                    <Button type="submit" value="Submit" className="primary">Submit</Button>
                </Form>
            </ModalBody>
        </Modal>
    </>);
}

const RenderComments = ({ comments, addComment, dishId }) => {
    if (comments !== null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <List type="unstyled" className="text-left">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id} className="mb-1">
                                    <p>{comment.comment}</p>
                                    <p>--{ comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        }) }
                    </Stagger>
                </List>
                <CommentForm dishId={dishId} addComment={addComment} toggleModal={this.toggleModal} isModalOpen={this.state.isModalOpen} />
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default DishDetail