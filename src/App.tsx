import { FC } from "react";
import MyNavbar from "./components/navbar/MyNavbar";
import SectionList from "./components/section/SectionList";

const App: FC = () => {
  return (
    <div>
      <MyNavbar />
      <SectionList />
    </div>
  );
};

export default App;
