import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Routes, Route, Navigate } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
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
                <Home />
            );
        }

        const MenuPage = () => {
            return (
                <Menu dishes={this.state.dishes}/>
            );
        }
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={HomePage()} />
                    <Route exact path="/menu" element={MenuPage()} />
                    <Route path="*" element={<Navigate to="/home" replace />}/>
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;