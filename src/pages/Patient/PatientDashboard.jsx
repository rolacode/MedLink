import { useState } from "react";
import Body from "../../components/Patient/Body";
import TopBar from "../../components/Patient/TopBar";
import Sidebar from "../../components/Patient/Sidebar";


const PatientDashboard = () => {
  // const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const userData = sessionStorage.getItem("userData");
  // const userToken = sessionStorage.getItem("userToken");
  // console.log(userToken);

  // if (userToken === null) {
  //   navigate("/shareholderlogin");
  // }

  return (
    <div>
      <TopBar toggleSidebar={toggleSidebar} />

      <div className="flex">
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className=" w-full mt-20 lg:ml-[17%] 2xl:ml-[18%] px-4 md:px-[30px]">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
