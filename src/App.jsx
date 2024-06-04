import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import ProductCard from './components/ProductCard';
import { supabase } from './supabaseClient';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10);
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([{ name, description }])
        .single()
      if (error) throw error;
      // setProducts([...products, ...data]);
      // setName('');
      // setDescription('');
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="full-page-container">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Products</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Item>Created by M Khan</Nav.Item>
            </Nav>
          </Container>
        </Navbar>
        <Container fluid className="main-content">
          <Row>
            <Col>
              <h3>Create Product</h3>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <Button onClick={createProduct}>Submit Create Product</Button>
            </Col>
          </Row>
          <hr />
          <h3>Database Products</h3>
          <Row xs={1} lg={3} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
        {/* <footer className="footer bg-light">
          <Container>
            <span>Footer content here</span>
          </Container>
        </footer> */}
      </div>
    </>
  );
}

export default App;
