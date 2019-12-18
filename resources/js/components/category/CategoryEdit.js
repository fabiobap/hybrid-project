import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCategory, editCategory } from '../../actions';
import CategoryForm from './CategoryForm';
import requireAuth from '../requireAuth';

class CategoryEdit extends React.Component {

    componentDidMount() {
        this.props.fetchCategory(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editCategory(this.props.match.params.id, formValues);
    }
    renderCategory = () => {
        if (!this.props.category) {
            return <div>Loading...</div>
        }

        return (
            <CategoryForm
                initialValues={_.pick(this.props.category, 'name')}
                onSubmit={this.onSubmit}
            />
        );
    }
    render() {
        return (
            <div className="container">
                <h3>Edit a Category</h3>
                {this.renderCategory()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        category: state.categoriesPagination[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, { fetchCategory, editCategory })(requireAuth(CategoryEdit));
