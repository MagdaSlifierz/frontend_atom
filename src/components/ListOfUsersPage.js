  import React, { useEffect, useState } from 'react';
  import { List, ListItem, Text , Flex, Button} from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import { useLocation } from 'react-router-dom';


  const ListOfUsersPage = () => {
    const location = useLocation();
    const user_id = location.state?.userId;
    const [users, setUsers] = useState([]);
    
    const navigate = useNavigate();

    const navigateTo = (path) => {
      navigate(path);
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

    return (
      <Flex
          as="nav"
          align="center"
          justify="center" // Change to center
          wrap="wrap"
          padding="0.5rem"
          bg="gray.400"
        >
      <List spacing={3}>
        {users.map((user, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <Text>{user.first_name +  " " + user.last_name}</Text>
          </ListItem>
        ))}
      </List>
      <Button colorScheme="teal" type="submit" onClick={() => navigateTo(`/user/${user_id}/todos`)} >
              Back to Todos
      </Button>

      </Flex>
    );
  };

  export default ListOfUsersPage;
