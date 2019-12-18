import React from 'react';
import { NavLink } from 'react-router-dom';

const LinkWrapper = props => {
    return (
        <NavLink activeClassName="selected" activeStyle={{ fontWeight: 'bold' }} {...props}></NavLink>
    );
}
export default LinkWrapper;
