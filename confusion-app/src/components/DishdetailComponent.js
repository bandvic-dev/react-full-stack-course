import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dish: props.dish
        }
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                <><div className="col-12 col-sm-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody className="text-left">
                            <CardTitle tag="h5">{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div><div className="col-12 col-sm-5 m-1">
                        <h4 className="h4 text-left">Comments</h4>
                        <List type="unstyled" className="text-left">
                            <li>Imagine all the eatables, living in conFusion</li>
                            <li>-- John Lemon, Oct 17, 2012</li>
                            <li>Sends anyone heacven, I wish I could get my mother-in-law to eat it!</li>
                            <li>-- Paul McVites, Sep 06, 2014</li>
                            <li>Eat it, just eat it!</li>
                            <li>-- Michael Jankishan, Feb 14, 2015</li>
                            <li>ultimate, Reaching for the stars!</li>
                            <li>--Ringo Starry, Dec 03, 2013</li>
                            <li>It's your birdthday, we're gonna party!</li>
                            <li>--25 Cent, Dec 03, 2011</li>
                        </List>
                    </div></>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                {this.renderDish(this.state.dish)}
            </div>
    )}
    
}

export default DishDetail