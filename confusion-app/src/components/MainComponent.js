import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
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
        return (
            <div>
                <Header />
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                {this.renderSelectedDish(this.state.dishes)}
                <Footer />
            </div>
        );
    }
}

export default Main;