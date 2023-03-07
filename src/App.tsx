import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/main/main';
import { PostsTable } from './components/posts-table/posts-table';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<PostsTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
