import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoriesToPagination, deleteCategory } from '../../actions';
import { Modal, Button, Icon } from 'react-materialize';
import Pagination from 'react-js-pagination';

class CategoryList extends React.Component {

    componentDidMount() {
        this.props.fetchCategoriesToPagination();
    }


    renderAdmin(category) {
        if (!this.props.authenticated) {
            return (
                <div><Link to={'/react/signin/'}>Sign In</Link> to be able to see this!</div>
            );
        }
        return (
            <>
                <Link to={`/react/category/edit/${category.id}`} className="waves-effect waves-light light-blue darken-4 btn">Edit<Icon right>edit</Icon></Link>
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
                        <Button flat modal="close" node="button" className="green" waves="green" onClick={() => this.props.deleteCategory(category.id)}>Yes<Icon right>check</Icon></Button>
                    ]}
                    header='Delete Category'
                    trigger={<Button className="red" waves='light'>Delete<Icon right>delete_forever</Icon></Button>}>
                    <p>Are you sure that you want to delete this category?</p>

                </Modal>
            </>
        );
    }
    renderTableHead() {
        return (
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        );
    }
    renderTableBody() {
        return this.props.categories.map(category => {

            return (
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td><Link to={`/react/category/${category.id}`}>{category.name}</Link></td>
                    <td>{this.renderAdmin(category)}</td>
                </tr>
            )
        });
    }
    handlePageChange = pageNumber => {
        return this.props.fetchCategoriesToPagination(pageNumber);
    }

    renderCreate() {
        return (
            <Link to="/react/category/new" className="waves-effect waves-ligth green btn-small">
                <Icon left>add</Icon>Create Category
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
        if (!this.props.categories) {
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
        categories: Object.values(state.categoriesPagination),
        meta: state.meta,
        errorMessage: state.categoriesPagination.errorMessage,
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { fetchCategoriesToPagination, deleteCategory })(CategoryList);
