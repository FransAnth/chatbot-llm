import { ErrorIcon, SuccessIcon } from "../../assets";

export interface ISuccessModal {
  message: string;
  title: string;
  type: "success" | "error";
  callback: (status: boolean) => any;
}

const Modal = ({ message, title, type, callback }: ISuccessModal) => {
  const getImage = () => {
    switch (type) {
      case "success":
        return <SuccessIcon style="w-20" />;
      case "error":
        return <ErrorIcon style="w-20" />;
    }
  };

  return (
    <div
      id="staticModal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-40 md:inset-0 h-modal md:h-full w-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-secondary mt-2 p-10 rounded-lg w-[24rem] text-white">
        <div className="flex flex-col justify-center items-center gap-6">
          {getImage()}
          <h4 className="text-successGreen font-semibold text-4xl">{title}</h4>
          <div className="px-4 text-center">{message}</div>
        </div>

        <div className="flex flex-row justify-center items-center pt-8 px-2">
          <button
            className=" bg-primary rounded-lg p-2 w-40 text-white font-semibold"
            onClick={() => callback(false)}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
