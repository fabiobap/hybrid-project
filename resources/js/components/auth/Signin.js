import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Icon, Button } from 'react-materialize';

class Signin extends Component {

    onSubmit = (formValues) => {
        this.props.signin(formValues);
    }

    render() {
        if (this.props.authenticated) {
            return (
                <div>You are already logged in!</div>
            );
        }
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <div className="row">
                    {this.props.errorMessage}
                    <form className="col s12" onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'30px'}}>
                        <div className="row">
                            <div className="input-field col s6">
                                <Icon className="material-icons prefix">contact_mail</Icon>
                                <Field
                                    className="validate"
                                    id="email"
                                    name="email"
                                    type="email"
                                    component="input"
                                    autoComplete="none"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s6">
                                <Icon className="material-icons prefix">vpn_key</Icon>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    component="input"
                                    autoComplete="none"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="center-align">

                        <Button className="btn waves-effect waves-light">Sign In!
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.auth.errorMessage,
        authenticated: state.auth.authenticated
    };
}
export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin' })
)(Signin);
