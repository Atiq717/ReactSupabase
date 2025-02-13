import { useState } from 'react'
import { Card, Button, Form} from 'react-bootstrap';
import { supabase } from '../supabaseClient';


function ProductCard(props) {
    const product = props.product;

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
  
    console.log(name);
    console.log(description);

    async function updateProduct(){
        try {
            const { data, error } = await supabase
              .from("products")
              .update([{ name, description }])
              .eq("id", product.id)
            if (error) throw error;
            // setProducts([...products, ...data]);
            // setName('');
            // setDescription('');
            window.location.reload();
          } catch (error) {
            setError(error.message);
          }
    };

    async function deleteProduct (){
        try {
            const { data, error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id)
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    };
      
  return (
    <Card style={{width: '18rem'}}>
        <Card.Body>
            { editing == false ?
                <>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant='danger' onClick={() => deleteProduct()}>Delete Product</Button>
                <Button variant='secondary' onClick = {() => setEditing(true)} >Edit Product</Button>
                </>
            :
                <>
                    <h4>Editing Product</h4>
                    <Button size='sm' onClick={() => setEditing(false)} >Go Back</Button>
                    <br />
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                    type="text"
                    id="name"
                    defaultValue={product.name}
                    onChange =  {(e) => setName(e.target.value)}
                    />
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                    type="text"
                    id="description"
                    defaultValue={product.description}
                    onChange = {(e) => setDescription(e.target.value)}
                    />
                    <br/>
                    <Button onClick={() => updateProduct()}>Update Product</Button>
                </>
            }
        </Card.Body>
    </Card>
  )
}

export default ProductCard