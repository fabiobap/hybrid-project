import React, { Component } from 'react';
import { TextInput, Icon } from 'react-materialize';

class ProductFileInput extends Component {


    render() {
        const { input, type, id, meta, placeholder } = this.props.field;
        const className = `${meta.error && meta.touched ? 'invalid' : 'valid'}`;
        const onInputChange = e => {
            e.preventDefault();
            const file = e.target.files[0];
            input.onChange(file);
        };
        return (
            <>
            <TextInput
                className={className}
                id={id}
                label={<Icon>search</Icon>}
                placeholder={placeholder}
                s={6}
                type={type}
                name='image'
                onChange={onInputChange}
                validate
            />
            {this.props.renderError(meta)}
            </>
        )
    }
}
export default ProductFileInput;
