import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import { listProducts } from '../actions/product.actions.js'
import SearchBox from '../components/SearchBox.js'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    // const [filter, setFilter] = useState('')

    useEffect(() => {
        dispatch(listProducts(
            keyword
            // rating: filter
        ))
    }, [dispatch, keyword])

    return (
        <>
            {/* <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Rating</Form.Label>
                <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                </Form.Control>
            </Form.Group> */}
            <h1>Later Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {Array.isArray(products.products) && products.products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen
