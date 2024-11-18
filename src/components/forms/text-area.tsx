interface ITextArea {
  label: string;
  name: string;
  register: any;
  rules?: any;
  error?: any;
  textareaStyle?: string;
}

const TextArea = ({
  label,
  name,
  register,
  rules,
  error,
  textareaStyle,
}: ITextArea) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={`rounded-lg w-full h-full ${textareaStyle}`}
        id={name}
        {...register(name, rules)}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default TextArea;
