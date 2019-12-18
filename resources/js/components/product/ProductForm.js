import React, { Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PopUp from '../PopUp';
import { Icon } from 'react-materialize';
import { fetchCategories } from '../../actions';
import ProductFileInput from './ProductFileInput';

class ProductForm extends React.Component {
    componentDidMount() {
        this.props.fetchCategories();
    }
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                PopUp.showMessage('error', error)
            );
        }
    }
    renderInput = ({ input, id, label, placeholder, meta }) => {
        const className = `${meta.error && meta.touched ? 'invalid' : 'valid'}`;
        return (
            <>
                <input {...input} id={id} autoComplete="off" placeholder={placeholder} className={className} />
                <label htmlFor={id} className="active">{label}</label>
                {this.renderError(meta)}
            </>
        );
    }

    renderTextArea = ({ input, id, label, placeholder }) => {
        return (
            <>
                <textarea {...input} rows={10} cols={40} id={id} autoComplete="off" placeholder={placeholder} className="materialize-textarea" />
                <label htmlFor={id} className="active">{label}</label>
            </>
        );
    }
    onSubmit = formValues => {
        //console.log(formValues);
        this.props.onSubmit(formValues);
    }
    renderSelectField = ({ input, id, label, options, meta }) => {
        const className = `${meta.error && meta.touched ? 'invalid red' : 'valid'}`;
        const categories =
            _.map(options, (category) => {
                return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                );
            });

        return (
            //due a bug in materialize I left this ugly select
            <>
                <select  {...input} id={id} className={`browser-default waves-effect waves-light btn ${className}`}>
                    <option value="">Select a category...</option>
                    {categories}
                </select>
                <label htmlFor={id}>{label}</label>
                {this.renderError(meta)}
            </>
        )
    }
    renderFile = field => {
        return (
            <ProductFileInput
                field={field}
                renderError={this.renderError}
            />
        );
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            component={this.renderInput}
                            label="Name"
                            placeholder="Enter with a name"
                        />
                    </div>
                    <div className="input-field col s6">
                        <Field
                            type="text"
                            id="prodCod"
                            name="prodCod"
                            component={this.renderInput}
                            label="Product Code"
                            placeholder="Enter with the product code"
                        />
                    </div>
                    <Field
                        type="file"
                        id="image"
                        name="image"
                        component={this.renderFile}
                        label="Image"
                        placeholder="Upload an image"
                    />
                    <div className="input-field col s6">
                        <Field
                            id="category_id"
                            label="Categories"
                            name="category_id"
                            options={this.props.categoriesSelect}
                            component={this.renderSelectField}
                        >
                        </Field>
                    </div>
                    <div className="input-field col s12">
                        <Field id="description" name="description" component={this.renderTextArea} label="Description" placeholder="Enter with a description (Optional)" />
                    </div>
                </div>
                <button className="waves-effect waves-light blue btn"><Icon right>send</Icon>Submit</button>
            </form>
        );
    }
}
const validate = formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = "Product must be named!";
    }
    if (!formValues.prodCod) {
        errors.prodCod = "Product code must not be empty!";
    }
    if (!formValues.category_id) {
        errors.category_id = "Products category must not be empty!";
    }
    if (!formValues.image) {
        errors.image = "Products image must not be empty!";
    }
    return errors;
};
const mapStateToProps = (state) => ({
    categoriesSelect: Object.values(state.categoriesSelect)
});
ProductForm = connect(mapStateToProps, { fetchCategories })(ProductForm);
export default reduxForm({
    form: 'productForm',
    validate
})(ProductForm);
