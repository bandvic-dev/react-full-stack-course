import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    renderDish(dish) {
        if(dish !== undefined) {
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody className="text-left">
                                <CardTitle tag="h5">{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div><div className="col-12 col-md-5 m-1">
                        <h4 className="h4 text-left">Comments</h4>
                        <List type="unstyled" className="text-left">
                            <li>Imagine all the eatables, living in conFusion</li>
                            <li className="mb-1">-- John Lemon, Oct 17, 2012</li>
                            <li>Sends anyone heacven, I wish I could get my mother-in-law to eat it!</li>
                            <li className="mb-1">-- Paul McVites, Sep 06, 2014</li>
                            <li>Eat it, just eat it!</li>
                            <li className="mb-1">-- Michael Jankishan, Feb 14, 2015</li>
                            <li>ultimate, Reaching for the stars!</li>
                            <li className="mb-1">--Ringo Starry, Dec 03, 2013</li>
                            <li>It's your birdthday, we're gonna party!</li>
                            <li className="mb-1">--25 Cent, Dec 03, 2011</li>
                        </List>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }

    }

    render() {
        return this.renderDish(this.props.dish);
    }
    
}

export default DishDetail