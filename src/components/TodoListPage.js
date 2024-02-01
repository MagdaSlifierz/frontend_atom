import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
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
  } from '@chakra-ui/react';
  import { ChevronDownIcon } from '@chakra-ui/icons';


const TodoListPage = () => {
    const { user_id } = useParams();
    const [todos, setTodos] = useState([]);
    const [addElement, setAddElement] = useState('');
    const [user, setUser] = useState(null);
    
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

    return (
        <VStack spacing={4} align="stretch" p={5}>
            <Flex justify="space-between" align="center">
                <Heading size="lg" mb={6}>ToDos List</Heading>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {user ? user.first_name : "User"}
                    </MenuButton>
                    <MenuList>
                        {/* Add MenuItems here if needed */}
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Other Users</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <form onSubmit={onSubmitForm}>
                 <Flex
                 as="nav"
                 align="center"
                 justify="center"
                 wrap="wrap"
                 padding="0.5rem"
                 bg="gray.400"
                 height="25vh" // Add height to make it full screen
               >
                <VStack spacing={4} width="100%" maxWidth="400px">
                    <Input
                        value={addElement}
                        onChange={(e) => setAddElement(e.target.value)}
                        placeholder="Add a new todo item"
                    />
                    <Button colorScheme="blue" type="submit" ml={2}>Add Todo</Button>
                </VStack>
                </Flex>
            </form>

            <List spacing={3}>
                {todos.map((todo, index) => (
                    <ListItem key={index} d="flex" alignItems="center">
                         <Text>{todo.title} 
                         <Checkbox isChecked={todo.completed} mr={2} />
                         </Text>
                    
                    </ListItem>
                ))}
            </List>
        </VStack>
    );
};

export default TodoListPage;