/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List, Breadcrumb, BreadcrumbItem, Label, Button, Modal, ModalHeader, ModalBody, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
        this.renderComments = this.renderComments.bind(this);
        this.ComentForm = this.ComentForm.bind(this);

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
    }

    renderDish(dish) {
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

    renderComments(comments) {
        if (comments !== null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <List type="unstyled" className="text-left">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id} className="mb-1">
                                    <p>{comment.comment}</p>
                                    <p>--{ comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        }) }
                    </List>
                    {this.ComentForm()}
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    ComentForm() {
        return (<>
            <Button className="btn btn-outline-dark" onClick={this.handlerShowModal}>
                <i className="fa fa-pencil"></i> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control type="number" model=".rating" id="rating" name="rating"
                                    value={this.state.ratingValue}
                                    placeholder="Rating"
                                    className="form-control"
                                    onChange={this.handlerChange} />
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
                        <Button type="sumit" value="Submit" className="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>);
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
                        {this.renderComments(this.props.comments)}
                    </div>
                </div>
            );
        }
    }
}

export default DishDetail