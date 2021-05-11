import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import axios from "axios"

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})
  useEffect(() => {
    const FetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }
    FetchProduct()
  })

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        <i className='fas fa-arrow-left mx-2' /> Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                text={"  " + product.numReviews + " Reviews"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock <= 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
