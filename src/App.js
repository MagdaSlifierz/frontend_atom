import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCreatePage from './components/UserCreatePage';
import TodoListPage from './components/TodoListPage';
import EditDeleteUserPage from './components/EditDeleteUserPage';
import { ChakraProvider } from "@chakra-ui/react";
import ListOfUsersPage from './components/ListOfUsersPage';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/create-user" element={<UserCreatePage/>} />
          <Route path="/user/:user_id/todos" element={<TodoListPage />} />
          <Route path="/user/:user_id" element={<EditDeleteUserPage />} /> 
          <Route path="/users" element={<ListOfUsersPage />} />
        </Routes>
      </Router>
  </ChakraProvider>
  );
}

export default App;
