interface IDropdownSelect {
  label: string;
  name: string;
  register: any;
  options: any;
  rules?: any;
  error?: any;
}

const DropdownSelect = ({
  label,
  name,
  options,
  register,
  rules,
  error,
}: IDropdownSelect) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        className="rounded-lg p-2 text-sm bg-primary"
        {...register(name, rules)}
      >
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default DropdownSelect;
