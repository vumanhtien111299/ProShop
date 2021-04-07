import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import CartScreen from './screens/CartScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import UserListScreen from './screens/UserListScreen.js'
import UserEditScreen from './screens/UserEditScreen.js'
import ProductListScreen from './screens/ProductListScreen.js'
import ProductEditScreen from './screens/ProductEditScreen.js'
import OrderListScreen from './screens/OrderListScreen.js'

const App = () => {
    return (
        <Router> {/**Fragment */}
            <Header />
            <main className="py-3">
                <Container>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/place-order' component={PlaceOrderScreen} />
                    <Route path='/orders/:id' component={OrderScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/admin/user-list' component={UserListScreen} />
                    <Route path='/admin/product-list' component={ProductListScreen} />
                    <Route path='/admin/order-list' component={OrderListScreen} />
                    <Route path='/admin/users/:id/edit' component={UserEditScreen} />
                    <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
                    <Route path='/search/:keyword' component={HomeScreen} />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
