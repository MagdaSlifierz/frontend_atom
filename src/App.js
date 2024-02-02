import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCreatePage from './components/UserCreatePage';
import TodoListPage from './components/TodoListPage';
import EditDeleteUserPage from './components/EditDeleteUserPage';
import { ChakraProvider } from "@chakra-ui/react";
import ListOfUsersPage from './components/ListOfUsersPage';
import EditDeleteTodosPage from './components/EditDeleteTodosPage';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/create-user" element={<UserCreatePage/>} />
          <Route path="/user/:user_id/todos" element={<TodoListPage />} />
          <Route path="/user/:user_id" element={<EditDeleteUserPage />} /> 
          <Route path="/users" element={<ListOfUsersPage />} />
          <Route path="/user/:user_id/todos/:todo_id" element={<EditDeleteTodosPage /> }/>
        </Routes>
      </Router>
  </ChakraProvider>
  );
}

export default App;
