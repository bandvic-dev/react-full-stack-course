import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Routes, Route, Navigate } from 'react-router-dom';

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

        const ContactPage = () => {
            return (
                <Contact />
            );
        }

        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={HomePage()} />
                    <Route exact path="/menu" element={MenuPage()} />
                    <Route exact path="/contactus" element={ContactPage()} />
                    <Route path="*" element={<Navigate to="/home" replace />}/>
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;