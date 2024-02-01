import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Flex,
    Heading,
  } from '@chakra-ui/react';

const UserCreatePage = () => {
    const [user, setUser] = useState ({
        "first_name" : "", 
        "last_name" : "",
        "email": "s"
    });

    // const handleButtonClick = () => {
    //     setDisplayText('User ${user.first_name} was successfully created');
    // };
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Making a POST request to your FastAPI backend
            const response = await fetch('http://localhost:8000/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user), // `user` is your form state containing the user data
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('User created:', data);
                navigate(`/user/${data.unique_id}/todos`);
                // Handle the response data
            } else {
                // Handle HTTP errors
                console.error('Failed to create user:', response.status);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
    
      <Flex
        as="nav"
        align="center"
        justify="center" // Change to center
        wrap="wrap"
        padding="0.5rem"
        bg="gray.400"
        height="100vh" // Add height to make it full screen
      >

        <VStack spacing={4} width="100%" maxWidth="400px"> // Restrict the max width of the form
        <Heading size="lg" mb={6}> Create User for Todo's List</Heading>
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
            Create
          </Button>
        </VStack>
      </Flex>
    </form>
    );
}; 
export default UserCreatePage;