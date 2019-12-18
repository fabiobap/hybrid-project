import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, editProduct } from '../../actions';
import ProductForm from './ProductForm';
import requireAuth from '../requireAuth';

class ProductEdit extends React.Component {

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editProduct(this.props.match.params.id, formValues);
    }
    renderProduct = () => {
        if (!this.props.product) {
            return <div>Loading...</div>
        }
        const { image } = this.props.product;
        //I'm feeding those imgs from a website so I made a little search if it's coming from
        //the backend or from the website and adding the correct link if it's coming from the backend
        var str = image;
        //search for the dir images
        var isImgWithin = str.search("images");
        //if theres any then add dir storage before it
        if (isImgWithin > 0) {
            var img = '/storage/' + image;
        } else {
            //if not just get the website url
            var img = image;
        }
        return (
            <>
                <div className="input-field col s12">
                    <img alt="Product Image" src={img}></img>
                </div>
                <ProductForm
                    initialValues={_.pick(this.props.product, 'name', 'prodCod', 'description', 'image', 'category_id')}
                    onSubmit={this.onSubmit}
                />
            </>
        );
    }
    render() {
        return (
            <div className="container">
                <h3>Edit a Product</h3>
                {this.renderProduct()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.productsPagination[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, { fetchProduct, editProduct })(requireAuth(ProductEdit));
