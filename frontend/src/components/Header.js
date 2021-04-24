import React from 'react'
import SearchBox from './SearchBox.js'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/user.actions.js'
import { Route } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(({ userLogin }) => userLogin);

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            {userInfo && !userInfo.isAdmin && (
                                <LinkContainer to="/cart">
                                    <Nav.Link>
                                        <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo ?
                                (
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fas fa-user"></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id="adminMenu">
                                    <LinkContainer to="/admin/user-list">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/product-list">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/order-list">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            <LinkContainer to="/chat">
                                <Nav.Link>
                                    <i className="fas fa-sms">SMS</i>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/feedback">
                                <Nav.Link>
                                    <i className="fab fa-rocketchat">FeedBack</i>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo && userInfo.isAdmin && (
                                <LinkContainer to="/feedback">
                                    <Nav.Link>
                                        <i className="fas fa-chart-bar">Chart</i>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    );
};

export default Header

