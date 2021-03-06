import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import { saveShippingAddress } from '../actions/cart.actions.js'

const ShippingScreen = ({ history }) => {
    const { shippingAddress } = useSelector(({ cart }) => cart)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, phoneNumber, postalCode, country }))
        history.push('/payment')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='address'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required={true}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='city'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required={true}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phoneNumber'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type='phoneNumber'
                    placeholder='Enter Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required={true}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='postalCode'
                    placeholder='Enter postalCode'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required={true}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='country'
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required={true}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>

        </Form>
    </FormContainer>
}

export default ShippingScreen
