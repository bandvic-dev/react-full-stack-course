import React, { Component } from 'react';

import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    renderSelectedDish(dishes) {
        if(this.state.selectedDish != null) {
            return <DishDetail dish={dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotions={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={ this.state.leaders.filter((leader) => leader.featured)[0] }
                />
            );
        }

        const MenuPage = () => {
            return (
                <Menu dishes={this.state.dishes}/>
            );
        }

        const AboutPage = () => {
            return (
                <About leaders={this.state.leaders}/>
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
            );
        }

        const ContactPage = () => {
            return (
                <Contact />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/aboutus" component={AboutPage} />
                    <Route exact path="/menu" component={MenuPage} />
                    <Route exact path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={ContactPage} />
                    <Redirect to="/" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;