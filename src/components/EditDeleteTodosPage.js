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
    AlertIcon,  Checkbox
 
  } from '@chakra-ui/react';
  

const EditDeleteTodosPage = () => {
    
    const {user_id }  = useParams();
    const {todo_id} = useParams();
    const [todos, setTodos] = useState({"title": "", "completed" : false});
    const [message, setMessage] = useState(null); // New state for the message
    const [status, setStatus] = useState('info'); // New state for status of the message (info, error, success)

    const navigate = useNavigate();
  
    const handleChange = (e) => {
        if (e.target.name === "completed"){
            setTodos({ ...todos, completed: e.target.checked });
        }
        else {
            setTodos({...todos, [e.target.name]: e.target.value });
        }
       
    };
    
    const editTodos = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos/${todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(todos)
            });
            
            if (response.ok) {
                setMessage("Your todo item was successfully updated.");
                setStatus('success');
                navigate(`/user/${user_id}/todos`);
              } else {
                console.error('Failed to update todo item');
                setMessage("Failed to update todo item.");
                setStatus('error');
              }
            
        }
        catch(err) {
            console.error(err.message)
            setMessage("An error occurred. Please try again.");
            setStatus('error');
        }
    };

    const deleteTodos = async (e) => {
        try{
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos/${todo_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"},
            });
            
            if (response.ok) {
                setMessage("Your todo item was successfully deleted.");
                setStatus('success');
                navigate(`/user/${user_id}/todos`);
              } else {
                console.error('Failed to delete todo item');
                setMessage("Failed to delete todo item.");
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
        const isConfirmed = window.confirm('Are you sure you want to delete this todo item?');
        if (isConfirmed) {
            deleteTodos();
        }
    };

    
    return (
        <form onSubmit={editTodos}>
    
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
        <Heading size="lg" mb={6}> Edit Todo Item</Heading>
        {message && ( 
            <Alert status={status}>
              <AlertIcon />
              {message}
            </Alert> )}

          <FormControl id="title">
            <FormLabel>Todo Name</FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="Todo Name"
              value={todos.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="completed">
            <FormLabel>Completed</FormLabel>
            <Checkbox isChecked={todos.completed}
              onChange={handleChange} mr={4} />
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

export default EditDeleteTodosPage;