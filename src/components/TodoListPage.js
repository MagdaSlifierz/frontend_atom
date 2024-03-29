import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button,
    Flex,
    Heading,
    Input,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Checkbox,
    VStack,
    Text,
    IconButton,
    Box,
    Stack, 
    HStack,
    Spacer,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';



const TodoListPage = () => {
    const { user_id } = useParams();
    const [todos, setTodos] = useState([]);
    const [addElement, setAddElement] = useState('');
    const [user, setUser] = useState(null);
    const {todo_id} = useParams();
    const [message, setMessage] = useState(null); // New state for the message
    const [status, setStatus] = useState('info'); // New state for status of the message (info, error, success)

    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };
    const navigateToUsers = () => {
        localStorage.setItem('userId', user_id); // Store user_id before navigating
        navigate("/users");
      };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Failed to fetch user:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [user_id]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos`);
                if (response.ok) {
                    const data = await response.json();
                    setTodos(data);
                } else {
                    console.error('Failed to fetch todos:', response.status);
                }
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, [user_id]);


    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {
                title: addElement,
                completed: false, // Assuming a default value, adjust as needed
            };
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
            setAddElement('');

        } catch (err) {
            console.error(err.message);
        }
    };
    const handleCheckboxChange = async (todoId, isChecked) => {
        const currentTodo = todos.find(todo => todo.unique_id === todoId);
        if (!currentTodo) {
            console.error("Todo item not found");
            return;
        }

        const updatedData = {
            title: currentTodo.title, 
            completed: isChecked
        };

        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos/${todoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                // Update the todos state to reflect the change
                setTodos(todos.map(todo => {
                    if (todo.unique_id === todoId) {
                        return { ...todo, completed: isChecked }; // Update the completed status
                    }
                    return todo;
                }));
            } else {
                throw new Error(`Failed to update todo item. Status: ${response.status}`);
            }
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    const deleteTodos = async (todoId) => {
        try{
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos/${todoId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"},
            });
            
            if (response.ok) {
                // Filter out the deleted todo item from the todos array
                setTodos(todos.filter(todo => todo.unique_id !== todoId));
                setMessage("Your todo item was successfully deleted.");
                setStatus('success');
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
      


    
    const handleDeleteClick = (todoId) => (e) => {
        e.preventDefault(); // Prevent form submission if it's within a form
        const isConfirmed = window.confirm('Are you sure you want to delete this todo item?');
        if (isConfirmed) {
            deleteTodos(todoId);
        }
    };




    return (
        <Box backgroundColor="gray.200" w="100vw" h="100vh" p={8} >
            <VStack spacing={4} align="stretch" >
                <Flex justify="space-between" p={4}>
                    <Spacer />
                    <Menu >
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green">
                            {user ? user.first_name : "User"}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => navigateTo(`/user/${user_id}`)}>Edit/Delete</MenuItem>
                            
                            <MenuItem onClick={navigateToUsers} >Other Users</MenuItem>
                        </MenuList>
                    </Menu>

                </Flex>
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                >
                  
                  <Heading size="lg" mt={10} >TaskMaster: Your Ultimate To-Do List Organizer</Heading>
                    <Box minW={{ base: "90%", md: "468px" }}>
                        <Stack
                            spacing={4}
                            mt={40}
                            p="1rem"
                            backgroundColor="gray.100"
                            boxShadow="md"
                        >

                            <form onSubmit={onSubmitForm}>
                                <VStack spacing={6}>
                                    <Input
                                        mt={8}
                                        value={addElement}
                                        onChange={(e) => setAddElement(e.target.value)}
                                        placeholder="Add a new todo item"
                                    />
                                    <Button colorScheme="green" type="submit">Add</Button>
                                </VStack>
                            </form>

                            <HStack spacing="24px" px="5%" w="100%">
                      

                            <List spacing={5} pt={5} mt={10} w="full">
                                {todos.map((todo, index) => (
                                    <ListItem key={index} d="flex" alignItems="center" justifyContent="space-between" w="full">
                                          <Flex p={3} w="full" h="50px" justifyContent="space-between">
                                          <Checkbox  mr={4}  size="lg"  borderColor="green.400" isChecked={todo.completed} onChange={(e) => handleCheckboxChange(todo.unique_id, e.target.checked)}/> 
                                          <Text flex={6} isTruncated>{todo.title}</Text>
                                          <Spacer />
                                          
                                        <IconButton icon={<EditIcon />} size='xs' colorScheme="green" mr={4} onClick={() => navigateTo(`/user/${user_id}/todos/${todo.unique_id}`)} />
                                        <IconButton icon={<DeleteIcon />} size='xs' colorScheme="red" onClick={handleDeleteClick(todo.unique_id)}  />
                                        
                                        </Flex>
                                    </ListItem>
                                ))}
                            </List>
                      
                            
                            </HStack>
                        </Stack>
                    </Box>
                </Stack>


            </VStack>
        </Box>
    );
};

export default TodoListPage;