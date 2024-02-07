import React, { useEffect, useState } from 'react';
import { List, ListItem, Text , Flex, Button, Stack, Box, Heading} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';



const ListOfUsersPage = () => {
  
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();

  

 const returnToTodoList = () => {
  const userId = localStorage.getItem('userId'); // Retrieve user_id
  if (userId) {
    navigate(`/user/${userId}/todos`);
  } else {
    console.error('User ID not found in localStorage');
    // Handle the error case, perhaps by navigating to a default route or showing an error message
  }
};

 
  useEffect(() => {
    // Function to fetch all users
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Set the users state with the fetched data
        } else {
          console.error('Failed to fetch list of users');
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    // Call the function to fetch users when the component mounts
    fetchAllUsers();
  }, []); // Empty dependency array means this effect runs once on mount
  
  const handleUserClick = (user_id) => {
    navigate(`/user/${user_id}/todos`);
  };
  return (
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
          <Heading size="lg" mb={20}> User Family: Get to Know Everyone!</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>

            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="gray.100"
              boxShadow="md"
            >
    <List spacing={3}>
      {users.map((user, index) => (
        <ListItem key={index} display="flex" alignItems="center">
          <Button variant="link" onClick={() => handleUserClick(user.unique_id)}>{user.first_name} {user.last_name}</Button>
        </ListItem>
      ))}
    </List>
    <Button colorScheme="green" type="submit" onClick={returnToTodoList} >
      Return to Your Task List
    </Button>
    </Stack>
    </Box>
    </Stack>
    </Flex>
  );
};

export default ListOfUsersPage;
