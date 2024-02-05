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
  } from '@chakra-ui/react';
  import { ChevronDownIcon } from '@chakra-ui/icons';
  import { useNavigate } from 'react-router-dom';


const TodoListPage = () => {
    const { user_id } = useParams();
    const [todos, setTodos] = useState([]);
    const [addElement, setAddElement] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    
    const navigateTo = (path) => {
       navigate(path);
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
        // Update local state
        // const updatedTodos = todos.map(todo => {
        //     if (todo.unique_id === todoId) {
        //         return { ...todo, completed: isChecked };
        //     }
        //     return todo;
        // });
        // setTodos(updatedTodos);
    
        // // Prepare the data for the update
        // const updatedData = { completed: isChecked };
        const currentTodo = todos.find(todo => todo.unique_id === todoId);
        if (!currentTodo) {
            console.error("Todo item not found");
            return;
        }

        const updatedData = {
            title: currentTodo.title, // Include the current title
            completed: isChecked
    };
    
        // Send update request to the backend
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/${user_id}/todos/${todoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            // Optionally, fetch updated todos list or handle success response
        } catch (err) {
            console.error("Error updating todo:", err);
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
                {/* Use onClick to handle navigation */}
                        <MenuItem onClick={() => navigateTo(`/user/${user_id}`)}>Edit/Delete</MenuItem>
                        <MenuItem onClick={() => navigateTo("/users", { state: { userId: user_id } })}>Other Users</MenuItem>
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

            <List spacing={5}>
    {todos.map((todo, index) => (
        <ListItem key={index} d="flex" alignItems="center">
             <Text>{todo.title} 
             <Checkbox isChecked={todo.completed} onChange={(e) => handleCheckboxChange(todo.unique_id, e.target.checked)} mr={4} />
             {/* Update the onClick to pass the correct todo.id */}
             <Button colorScheme="blue" type="submit" size='xs' mr={4} onClick={() => navigateTo(`/user/${user_id}/todos/${todo.unique_id}`)}>Edit</Button>
            <Button colorScheme="red" type="submit" size='xs' mr={4} onClick={() => navigateTo(`/user/${user_id}/todos/${todo.unique_id}`)}>Delete</Button>
            
            </Text>
        </ListItem>
    ))}
</List>
        </VStack>
    );
};

export default TodoListPage;