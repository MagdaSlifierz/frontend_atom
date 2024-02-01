import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCreatePage from './components/UserCreatePage';
import TodoListPage from './components/TodoListPage';
import { ChakraProvider } from "@chakra-ui/react";


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/create-user" element={<UserCreatePage/>} />
          <Route path="/user/:user_id/todos" element={<TodoListPage />} />
        </Routes>
      </Router>
  </ChakraProvider>
  );
}

export default App;
