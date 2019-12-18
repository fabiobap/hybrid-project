import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductsToPagination, deleteProduct } from '../../actions';
import { Modal, Button, Icon } from 'react-materialize';
import Pagination from 'react-js-pagination';

class ProductList extends React.Component {

    componentDidMount() {
        this.props.fetchProductsToPagination();
    }


    renderAdmin(product) {
        return (
            <>
                <Link to={`/react/product/edit/${product.id}`} className="waves-effect waves-light light-blue darken-4 btn">Edit<Icon right>edit</Icon></Link>
                <Modal
                    options={{
                        dismissible: true,
                        endingTop: '10%',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 500,
                        preventScrolling: true,
                        startingTop: '4%'
                    }}
                    fixedFooter
                    actions={[
                        <Button flat modal="close" node="button" className="grey lighten-2" waves="light">Close<Icon right>cancel</Icon></Button>,
                        <Button flat modal="close" node="button" className="green" waves="green" onClick={() => this.props.deleteProduct(product.id)}>Yes<Icon right>check</Icon></Button>
                    ]}
                    header='Delete Product'
                    trigger={<Button className="red" waves='light'>Delete<Icon right>delete_forever</Icon></Button>}>
                    <p>Are you sure that you want to delete this product?</p>

                </Modal>
            </>
        );
    }
    renderTableHead() {
        return (
            <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        );
    }
    renderTableBody() {
        return this.props.products.map(product => {
            //I'm feeding those imgs from a website so I made a little search if it's coming from
            //the backend or from the website and adding the correct link if it's coming from the backend
            var str = product.image;
            //search for the dir images
            var isImgWithin = str.search("images");
            //if theres any then add dir storage before it
            if (isImgWithin > 0) {
                var img = '/storage/' + product.image;
            } else {
            //if not just get the website url
                var img = product.image;
            }
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td><img style={{ width: '200px', height: '100px' }} alt="Product Image" src={img}></img></td>
                    <td><Link to={`/react/product/${product.id}`}>{product.name}</Link></td>
                    <td>{this.renderAdmin(product)}</td>
                </tr>
            )
        });
    }
    handlePageChange = pageNumber => {
        return this.props.fetchProductsToPagination(pageNumber);
    }

    renderCreate() {
        return (
            <Link to="/react/product/new" className="waves-effect waves-ligth green btn-small">
                <Icon left>add</Icon>Create Product
            </Link>
        );
    }
    renderTable() {
        return (
            <>
                <table className="responsible table highlight centered">
                    <thead>
                        {this.renderTableHead()}
                    </thead>
                    <tbody>
                        {this.renderTableBody()}
                    </tbody>
                </table>
                <div className="row">
                    <div className="col s6 center-align">
                        <Pagination
                            activePage={this.props.meta.current_page}
                            itemsCountPerPage={this.props.meta.per_page}
                            totalItemsCount={this.props.meta.total}
                            pageRangeDisplayed={3}
                            onChange={this.handlePageChange}
                            itemClass='waves-effect'
                            activeClass='active'
                            hideNavigation={true}
                        />
                    </div>
                    <div className="col s6 right-align">
                        {this.renderCreate()}
                    </div>
                </div>
            </>
        );
    }
    render() {
        if (!this.props.products) {
            return <div>loading...</div>
        }

        return (
            <div className="container">
                {this.renderTable()}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: Object.values(state.productsPagination),
        meta: state.meta,
        errorMessage: state.productsPagination.errorMessage
    }
}
export default connect(mapStateToProps, { fetchProductsToPagination, deleteProduct })(ProductList);
