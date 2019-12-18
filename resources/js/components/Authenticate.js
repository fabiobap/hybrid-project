import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import LoginForm from './login/LoginForm'

class Authenticate extends React.Component {

    onSubmit = formValues => {
        this.props.signIn(formValues);
    }

    render() {
        return (
            <div className="container">
                <h3>Login</h3>
                <LoginForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}
export default connect(null, { signIn })(Authenticate);
