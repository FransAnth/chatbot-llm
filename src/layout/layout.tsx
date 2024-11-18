import { Outlet } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useLoginStore } from "../store/login-info-store";
import SidebarItem from "../components/sidebar/sidebar-item";
import { ChatIcon, GearIcon } from "../assets";
import { Sidebar } from "../components/sidebar/sidebar";

const PageLayout = () => {
  const userId = useLoginStore((state) => state.userId);
  const setLoginStore = useLoginStore((state) => state.setLoginStore);

  useEffect(() => {
    if (userId === "") {
      const newUserId = uuidv4();

      setLoginStore(newUserId);
    }
  }, []);

  return (
    <>
      <div className="flex w-full">
        <Sidebar>
          <SidebarItem
            icon={<ChatIcon style="w-6 h-6" />}
            title="Chats"
            path="/chats"
          />
          <SidebarItem
            icon={<GearIcon style="w-6 h-6" />}
            title="Configuration"
            path="/config"
          />
        </Sidebar>
        <div className="w-full h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PageLayout;
