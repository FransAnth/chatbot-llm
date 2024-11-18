import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { uploadFile } from "../../services/FileManagerService";
import Loader from "../global/loader";
import Modal from "../modals/modal";

const FileUploader = () => {
  const [file, setFile] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState<any>("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const { mutate: uploadFileFn, isPending: isFileUploading } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (response: any) => {
      const responseMessage = response.data.message;

      setModalOpen(true);
      setModalMessage(responseMessage);
      setModalTitle("SUCCESS!");
      setModalType("success");
    },

    onError: (response: any) => {
      const responseMessage = response.response.data.message;

      setModalOpen(true);
      setModalMessage(responseMessage);
      setModalTitle("Error!");
      setModalType("error");
    },
  });

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    uploadFileFn(formData);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="file-uploader">File Uploader</label>
        <div id="file-uploader" className="flex flex-col gap-2">
          <input
            className="bg-primary rounded-sm"
            type="file"
            onChange={handleFileChange}
          />
          <div className="flex flex-row justify-end">
            <button
              className="bg-primary text-white w-fit rounded-lg py-2 px-4"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
        {isFileUploading && <Loader />}
      </div>
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

export default FileUploader;
