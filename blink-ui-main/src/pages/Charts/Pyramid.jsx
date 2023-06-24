import React from 'react';
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import {InputLabel,Select,MenuItem} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Pyramid = () => {

  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const Types = ['Income', 'Expense'];
  const handleChange = (event) => {
    setType(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    try {
        event.preventDefault();
        const data = await axios.post("/addTransaction", {
          name: "649682d4aaba6f70a92afb5e",
          type: type,
          category: category,
          amount: amount,
    });
      
        if(data.status === 201){
          navigate("/dashboard", {state:{user: "name"}});
        }

    } catch (error) {
        console.log(error);
        alert("Invalid username or password!");
        navigate("/pyramid");
    }       
}

  return (
    <>
    <Container>
    <div className="heading"><h2>Add New Transaction</h2></div>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicShopName">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" required="true" onChange={e => setAmount(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicShopName">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text"  required="true" onChange={e => setCategory(e.target.value)} />
      </Form.Group>
      <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={type}
                onChange={handleChange}
              >
                {Types.map((cat) => (
                  <MenuItem value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
      <Button variant="primary" type="submit" onSubmit={(e) => handleSubmit(e)} >
        Add
      </Button>
    </Form>
    </Container>
    </>
  );
};

export default Pyramid;
