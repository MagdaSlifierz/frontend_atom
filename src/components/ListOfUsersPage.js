import React, { useEffect, useState } from 'react';
import { List, ListItem, Text , Flex} from '@chakra-ui/react';

const ListOfUsersPage = () => {
  const [users, setUsers] = useState([]);

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

    </Flex>
  );
};

export default ListOfUsersPage;
