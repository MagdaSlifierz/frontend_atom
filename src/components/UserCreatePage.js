import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
  Heading,
  Text,
  Box
} from '@chakra-ui/react';

const UserCreatePage = () => {
  const [user, setUser] = useState({
    "first_name": "",
    "last_name": "",
    "email": ""
  });

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
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
        navigate(`/user/${data.unique_id}/todos`);
      } else {
        console.error('Failed to create user:', response.status);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
          <Heading size="lg" mb={20}> Your New Task-Tracking Adventure Begins Here!</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>

            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="gray.100"
              boxShadow="md"
            >
              <Text fontSize='3xl' align="center"> Create Your Account </Text>
              <FormControl id="first_name" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={user.first_name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="last_name" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={user.last_name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="email" isRequired >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                />
              </FormControl>

              <Button colorScheme="green" type="submit" mt={8}>
                Create
              </Button>
            </Stack>
          </Box>

        </Stack>
      </Flex>
    </form>

  );
};
export default UserCreatePage;