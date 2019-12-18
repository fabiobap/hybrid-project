import React from 'react';
import { connect } from 'react-redux';
import { createCategory } from '../../actions';
import CategoryForm from './CategoryForm';
import requireAuth from '../requireAuth';

class CategoryCreate extends React.Component {

    onSubmit = formValues => {
        this.props.createCategory(formValues);
    }

    render() {
        return (
            <div className="container">
                <h3>Create a Category</h3>
                <CategoryForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}
export default connect(null, { createCategory })(requireAuth(CategoryCreate));
