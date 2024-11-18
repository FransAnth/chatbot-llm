import { Send, TrashIcon } from "lucide-react";
import { useState } from "react";

interface IActionButton {
  label: string;
  type: "submit" | "delete";
  callback: () => any;
}

const ActionButton = ({ label, type, callback }: IActionButton) => {
  const setButtonStyle = () => {
    switch (type) {
      case "submit":
        return "text-white bg-primary";
      case "delete":
        return "text-white bg-warn";
      default:
        return "text-white bg-primary";
    }
  };

  const setButtonIcon = () => {
    switch (type) {
      case "submit":
        return <Send size={24} />;
      case "delete":
        return <TrashIcon size={18} />;
      default:
        return <Send />;
    }
  };

  return (
    <>
      <button
        onClick={callback}
        className={`flex items-center gap-2 w-f rounded-lg py-2 px-4 ${setButtonStyle()}`}
      >
        {setButtonIcon()}
        {label}
      </button>
    </>
  );
};

export default ActionButton;
