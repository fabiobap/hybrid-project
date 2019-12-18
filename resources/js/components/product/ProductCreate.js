import React from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../actions';
import ProductForm from './ProductForm';
import requireAuth from '../requireAuth';

class ProductCreate extends React.Component {

    onSubmit = formValues => {
        this.props.createProduct(formValues);
    }

    render() {
        return (
            <div className="container">
                <h3>Create a Product</h3>
                <ProductForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}
export default connect(null, { createProduct })(requireAuth(ProductCreate));
