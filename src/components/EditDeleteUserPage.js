import React, {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Flex,
    Heading,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Alert,
    AlertIcon
 
  } from '@chakra-ui/react';
  

const EditDeleteUserPage = () => {
    
    const {user_id }  = useParams();
    const [user, setUser] = useState({"first_name": "", "last_name" : "", "email": ""});
    const [message, setMessage] = useState(null); // New state for the message
    const [status, setStatus] = useState('info'); // New state for status of the message (info, error, success)

    const navigate = useNavigate();
  
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    const editUser = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(user)
            });
            navigate((`/user/${user_id}`));
            
            if (response.ok) {
                const data = await response.json();
                setMessage("Your user was successfully updated.");
                setStatus('success');
                navigate(`/user/${user_id}`);
              } else {
                console.error('Failed to update user');
                setMessage("Failed to update user.");
                setStatus('error');
              }
            
        }
        catch(err) {
            console.error(err.message)
            setMessage("An error occurred. Please try again.");
            setStatus('error');
        }
    };

    const deleteUser = async (e) => {
        try{
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"},
            });
            navigate((`/user/${user_id}`));
            
            if (response.ok) {
                setMessage("Your user was successfully deleted.");
                setStatus('success');
                navigate("/create-user");
              } else {
                console.error('Failed to delete user');
                setMessage("Failed to delete user.");
                setStatus('error');
              }
            
        }
        catch(err) {
            console.error(err.message)
            setMessage("An error occurred. Please try again.");
            setStatus('error');
        }
    };


    
    const handleDeleteClick = (e) => {
        e.preventDefault(); // Prevent form submission if it's within a form
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');
        if (isConfirmed) {
            deleteUser();
        }
    };

    
    return (
        <form onSubmit={editUser}>
    
      <Flex
        as="nav"
        align="center"
        justify="center" // Change to center
        wrap="wrap"
        padding="0.5rem"
        bg="gray.400"
        height="100vh" // Add height to make it full screen
      >

        <VStack spacing={4} width="100%" maxWidth="400px"> 
        <Heading size="lg" mb={6}> Edit User for Todo's List</Heading>
        {message && ( 
            <Alert status={status}>
              <AlertIcon />
              {message}
            </Alert> )}
          <FormControl id="first_name">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="first_name"
              placeholder="First name"
              value={user.first_name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="last_name">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={user.last_name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
          </FormControl>

          {/* Other input fields */}

          <Button colorScheme="blue" type="submit">
            Edit
          </Button>

          <Button colorScheme="red" type="submit" onClick={handleDeleteClick}>
            Delete
          </Button>
        </VStack>
      </Flex>
    </form>
    );
};

export default EditDeleteUserPage;