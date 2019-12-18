import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";
import LinkWrapper from './LinkWrapper';
import { Button, Icon } from 'react-materialize';
import history from '../history';
import reactLogo from '../assets/img/react.jpg'
class Header extends Component {

    componentDidMount() {
        M.AutoInit();
    }

    renderLinks() {
        if (this.props.authenticated) {
            return (
                <div>
                    <LinkWrapper to="/react/signout" className="indigo-text">Sign Out</LinkWrapper>
                </div>
            );
        } else {
            return (

                <div>
                    <LinkWrapper className="indigo-text" to="/react/signin">Sign In</LinkWrapper>
                </div>
            );
        }
    }

    renderNavbar() {

        return (
            <header>
                <ul id='dropdown1' className='dropdown-content'>
                    {this.renderLinks()}
                </ul>
                <nav>
                    <div className="nav-wrapper indigo darken-2">
                        <a href="#" data-target="slide-out" className="sidenav-trigger nav-logo"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right">
                            <a className='dropdown-trigger' href='#!' data-target='dropdown1'><i className=' material-icons'>account_circle</i></a>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
    renderSidebar() {
        return (
            <>
                <ul id="slide-out" className="sidenav sidenav-fixed">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={reactLogo} />
                            </div>
                            <a href="#name"><span style={{ marginTop: '110px', marginBottom: '15px', marginLeft: '72px' }} className="white-text name">Project Hybrid</span></a>
                        </div>
                    </li>
                    <li><LinkWrapper to='/react/home'>Home</LinkWrapper></li>
                    <li><LinkWrapper to='/react/category/list'>Categories</LinkWrapper></li>
                    <li><LinkWrapper to='/react/product/list'>Products</LinkWrapper></li>
                </ul>

            </>
        );
    }
    redirectToPage(page){
        history.push(`/react/${page}/new`);
    }
    renderFAB() {
        return (
            <Button
                className="red"
                fab
                floating
                large
                node="button"
            >
                <Button
                    data-position="left"
                    className="green"
                    floating
                    icon={<Icon>add</Icon>}
                    node="button"
                    tooltip='Add Category'
                    onClick={()=> this.redirectToPage('category')}
                    />
                <Button
                    data-position="left"
                    className="blue"
                    floating
                    icon={<Icon>add</Icon>}
                    node="button"
                    tooltip='Add Product'
                    onClick={()=>this.redirectToPage('product')}
                />
            </Button>
        );
    }
    render() {
        return (
            <Fragment>
                {this.renderNavbar()}
                {this.renderSidebar()}
                {this.renderFAB()}
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return { authenticated: state.auth.authenticated }
}
export default connect(mapStateToProps)(Header);
