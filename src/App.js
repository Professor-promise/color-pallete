import Colors from './components/Colors/Colors';
import Profile from './components/Colors/Profile';
import Login from './components/Form/Login';
import { useAuth } from './firebaseConfig';

function App() {
  const currentUser = useAuth();
  return (
    <div
      className={
        currentUser
          ? 'bg-white h-full w-full'
          : 'w-full flex flex-col items-center justify-center h-full gap-1'
      }
    >
      {currentUser && (
        <>
          <Profile />
          <Colors />
        </>
      )}
      <Login />
    </div>
  );
}

export default App;
