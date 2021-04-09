import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { AWS_FOLDER } from '../config.js'
import Rating from './Rating'


const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <img src={`${AWS_FOLDER.IMAGE}${product.image}`, product.image} style={{ width: '225px', height: '280px' }} variant='top' alt="image" />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>

                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as="h3">{product.price}</Card.Text>
            </Card.Body>

        </Card>
    )
}

export default Product
