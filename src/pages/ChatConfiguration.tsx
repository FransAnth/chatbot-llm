import { useForm } from "react-hook-form";
import FileUploader from "../components/file-manager/file-uploader";
import TextArea from "../components/forms/text-area";
import DropdownSelect from "../components/forms/dropdown-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getChatConfig, modifyChatConfig } from "../services/ChatService";
import { useLoginStore } from "../store/login-info-store";
import { useEffect, useState } from "react";
import Loader from "../components/global/loader";
import Modal from "../components/modals/modal";

const ChatConfigPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      instruction: "",
      modelType: "",
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState<any>("");

  const userId = useLoginStore((state) => state.userId);

  const { data: queryResponse, status: queryStatus } = useQuery({
    queryKey: ["chatConfigData"],
    queryFn: async () => {
      return await getChatConfig(userId);
    },
  });

  const modelTypeOptions = [
    { label: "OpenAI GPT-4o", value: "gpt-4o" },
    { label: "OpenAI GPT-4o Mini", value: "gpt-4o-mini" },
    { label: "OpenAI GPT-4o Turbo", value: "gpt-4-turbo" },
    { label: "OpenAI GPT-4", value: "gpt-4" },
  ];

  const { mutate: modifyChatConfigFn, isPending: isModifyChatPending } =
    useMutation({
      mutationFn: modifyChatConfig,
      onSuccess: (response: any) => {
        console.log(response);

        const responseMessage = response.data.message;

        setModalOpen(true);
        setModalMessage(responseMessage);
        setModalTitle("SUCCESS!");
        setModalType("success");
      },
      onError: (response: any) => {
        console.log("ERROR", response);
        const responseMessage = response.response.data.message;

        setModalOpen(true);
        setModalMessage(responseMessage);
        setModalTitle("Error!");
        setModalType("error");
      },
    });

  const processFormSubmit = (data: any) => {
    const confiData = {
      ...data,
      userId: userId,
    };

    modifyChatConfigFn(confiData);
  };

  useEffect(() => {
    if (queryStatus === "success") {
      if (queryResponse) {
        console.log(queryResponse);
        const defaultFormData = {
          ...queryResponse,
          modelType: queryResponse.model_type,
        };

        console.log(defaultFormData);
        reset(defaultFormData);
      }
    }
  }, [queryStatus]);

  return (
    <>
      <div className="flex flex-col p-12 bg-secondary h-full text-white">
        <div className="text-xl text-center pb-12">Chat Configuration</div>
        <div className="flex flex-row gap-10">
          <form
            onSubmit={handleSubmit(processFormSubmit)}
            className="flex flex-col gap-8 w-3/4"
          >
            <TextArea
              label="Instructions"
              name="instruction"
              register={register}
              error={errors}
              textareaStyle="min-h-[42vh] p-4 text-sm bg-primary"
            />
            <DropdownSelect
              label="Model Type"
              name="modelType"
              options={modelTypeOptions}
              register={register}
              error={errors}
            />
            <button
              onClick={processFormSubmit}
              className="bg-primary w-fit rounded-lg py-2 px-4 text-white"
            >
              Submit
            </button>
          </form>
          <div>
            <FileUploader />
          </div>
        </div>
      </div>
      {isModifyChatPending && <Loader />}
      {modalOpen && (
        <Modal
          message={modalMessage}
          title={modalTitle}
          type={modalType}
          callback={setModalOpen}
        />
      )}
    </>
  );
};

export default ChatConfigPage;
