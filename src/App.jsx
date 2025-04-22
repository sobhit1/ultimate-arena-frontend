import Profile from './Profile.jsx';
import Contests from './Contests.jsx';

function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <div className="mainNavbar h-[6vh] w-[100vw] grid grid-cols-2 divide-x divide-white bg-[#000000]">
          <div className="userProfile flex justify-center items-center">
            <h1 className="font-doto fontSize text-[#ffffff] hover:text-[#87CEEB] cursor-pointer">Profile</h1>
          </div>
          <div className="userContests flex justify-center items-center">
            <h1 className="font-doto fontSize text-[#ffffff] hover:text-[#87CEEB] cursor-pointer">Contests</h1>
          </div>
        </div>
        <Contests/>
      </div>
    </>
  );
}

export default App;