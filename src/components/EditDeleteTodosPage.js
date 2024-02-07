import React, {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Flex,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Stack,
    Alert,
    AlertIcon,  
    Checkbox,
    Box,
    HStack,
    IconButton,
 
  } from '@chakra-ui/react';
  import { CheckIcon, DeleteIcon, ArrowBackIcon } from '@chakra-ui/icons';
  

const EditDeleteTodosPage = () => {
    
    const {user_id }  = useParams();
    const {todo_id} = useParams();
    const [todos, setTodos] = useState({"title": "", "completed" : false});
    const [message, setMessage] = useState(null); // New state for the message
    const [status, setStatus] = useState('info'); // New state for status of the message (info, error, success)

    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target; // Correctly handle text changes
      setTodos(prevTodos => ({ ...prevTodos, [name]: value }));
    };
  
    const handleCheckboxChange = (isChecked) => {
      // Correctly update the 'completed' state without trying to send a request here
      setTodos(prevTodos => ({ ...prevTodos, completed: isChecked }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to update todo, similar to what was inside handleCheckboxChange
        try {
          const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos/${todo_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todos),
          });
    
          if (response.ok) {
            setMessage("Todo updated successfully.");
            setStatus('success');
            navigate(`/user/${user_id}/todos`);
          } else {
            throw new Error(`Failed to update todo item. Status: ${response.status}`);
          }
        } catch (err) {
          console.error("Error updating todo:", err);
          setMessage("An error occurred while updating the todo item.");
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
      <form onSubmit={handleSubmit}>
  
  <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
           <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
            <Heading size="lg" mb={6}>Edit Todo Item</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
            {message && (
              <Alert status={status}>
                <AlertIcon />
                {message}
              </Alert>
            )}

            <Stack
              spacing={4}
              p="2rem"
              backgroundColor="gray.100"
              boxShadow="md"
            >
              <HStack spacing="18px" px="2%" w="100%">
  
            <FormControl id="title">
              <Input  
                type="text"
                name="title"
                placeholder="Todo Name"
                value={todos.title}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="completed">
              <Checkbox mr={4}  size="lg"  borderColor="green.400" isChecked={todos.completed} onChange={(e) => handleCheckboxChange(e.target.checked)}  />
            </FormControl>
  
            <IconButton icon={<CheckIcon  />} size='sm' colorScheme="green" type="submit" mr={4}/>
            <IconButton icon={<DeleteIcon />} size='sm' colorScheme="red" onClick={handleDeleteClick} />
            <IconButton icon={<ArrowBackIcon />}  size='sm'colorScheme="blue" type="submit" onClick={() => navigate(`/user/${user_id}/todos`)} />
           
            </HStack>
            </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    );
  };
  
  export default EditDeleteTodosPage;