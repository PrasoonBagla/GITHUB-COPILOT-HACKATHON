import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import { signInWithPopup} from "firebase/auth";
// import {auth,provider} from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';
import axios from './components/axios';
import { useState,useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const BuyerLogin = () => {
  
  const navigate = useNavigate();

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  
  //using local storage to initial authentication check and current user 
  localStorage.setItem("isAuthenticated", "false");
  localStorage.setItem('user', "");

  //checking if the user exists
  const handleSubmit = async (event) => {
    try {
        event.preventDefault();
        const data = await axios.post("/customer/login", {
        contact,
        password
    });
        // console.log(data.data.name);
        // const name = data.data.name;
        if(data.status === 200){
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem('user', data.data._id);
            navigate("/dashboard");
        }

    } catch (error) {
        console.log("done");
        alert("Invalid username or password!");
        window.location.reload();
        navigate("/");
    }       
}

  return (
    <Container >
        <div className='Login_name'> 
        <h1>Welcome to <span className="hawkerspot">ETrack</span></h1>
        <p>Track all you finances in one place.</p>
            <h2>Login</h2>
            <p>Sign in with your data that you entered during your registration</p>
        </div>
       <Form className='rounded p-4 p-sm-3'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control type="number" placeholder="Enter Contact Number" required="true" onChange={e => setContact(e.target.value)} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required="true" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary" type="submit" href="/dashboard" onClick={(e) => handleSubmit(e)}>
        Login
      </Button>
      <div style={{ display: "flex", alignItems: "center" }}>
    
</div>
    </Form>
    <div className='foot'>
    {/* <a href="#" class="text-decoration-none">Forget Password</a> */}
    <p>Don't have an account? <a href="/signin" class="text-decoration-none">Sign Up</a></p>
    </div>
    </Container>
  )
}

export default BuyerLogin
