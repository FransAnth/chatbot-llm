import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState } from "react";

const SidebarContext = createContext({});

const Sidebar = ({ children }: any) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen w-fit">
      <nav className="h-full flex flex-col bg-primary text-white border-r shadow-sm">
        <div className="py-4 px-2 flex justify-between items-center">
          <img
            src="src\assets\images\chatbot-icon.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-24" : "w-0"
            } p-2`}
          />
          <button
            onClick={() => setExpanded((value) => !value)}
            className="p-1.5 rounded-3xl bg-gray-50 hover:bg-gray-300 text-black"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export { Sidebar, SidebarContext };
