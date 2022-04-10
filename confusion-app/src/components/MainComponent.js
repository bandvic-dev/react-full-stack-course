import React, { Component } from 'react';

import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
})

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    renderSelectedDish(dishes) {
        if(this.props.selectedDish != null) {
            return <DishDetail dish={dishes.filter((dish) => dish.id === this.props.selectedDish)[0]} />
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        console.log(this.props.promotions.promotions);
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading} 
                    errMess={this.props.dishes.dishesErrMess} 
                    promotions={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
                    promosLoading={this.props.promotions.isLoading} 
                    promosErrMess={this.props.promotions.errMess} 
                />
            );
        }

        const MenuPage = () => {
            return (
                <Menu dishes={this.props.dishes}/>
            );
        }

        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders}/>
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    addComment={this.props.addComment} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));