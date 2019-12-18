import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import PopUp from '../PopUp';
import {Icon} from 'react-materialize';
class CategoryForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
            PopUp.showMessage('error', error)
            );
        }
    }
    renderInput = ({ input, id, label,placeholder, meta }) => {
        const className = `${meta.error && meta.touched ? 'invalid' : 'valid'}`;
        return (
            <>
                <input {...input} id={id} autoComplete="off" placeholder={placeholder} className={className}/>
                <label htmlFor={id} className="active">{label}</label>
                {this.renderError(meta)}
            </>
        );
    }
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <Field id="name" name="name" component={this.renderInput} label="Name" placeholder="Enter with a name"/>
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
        errors.name = "Category must be named!";
    }
    return errors;
};

export default reduxForm({
    form: 'categoryForm',
    validate
})(CategoryForm);
