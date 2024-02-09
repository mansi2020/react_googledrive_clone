import Header from "./../Header/Header";
import Sidebar from "./../Sidebar/Sidebar";
import Data from "./../Data/Data";

const Drivepage = () => {
  return (
    <div>
      <Header />
      <div className="App-container">
        <Sidebar />
        <Data />
      </div>
    </div>
  );
};

export default Drivepage;
