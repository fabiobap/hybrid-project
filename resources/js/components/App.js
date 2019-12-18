import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CategoryList from './category/CategoryList';
import CategoryCreate from './category/CategoryCreate';
import CategoryEdit from './category/CategoryEdit';
import CategoryShow from './category/CategoryShow';
import ProductList from './product/ProductList';
import ProductCreate from './product/ProductCreate';
import ProductEdit from './product/ProductEdit';
import ProductShow from './product/ProductShow';
import Home from './Home';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <Router history={history}>
            <Header />
            <div className="container">
                <Switch>
                    <Route path="/react/signin" exact component={Signin} />
                    <Route path="/react/signout" exact component={Signout} />
                    <Route path="/react/home" exact component={Home} />
                    <Route path="/react/category/list" exact component={CategoryList} />
                    <Route path="/react/category/new" exact component={CategoryCreate} />
                    <Route path="/react/category/edit/:id" exact component={CategoryEdit} />
                    <Route path="/react/category/:id" exact component={CategoryShow} />
                    <Route path="/react/product/list" exact component={ProductList} />
                    <Route path="/react/product/new" exact component={ProductCreate} />
                    <Route path="/react/product/edit/:id" exact component={ProductEdit} />
                    <Route path="/react/product/:id" exact component={ProductShow} />
                </Switch>
            </div>
        </Router>
    );
}
export default App;
