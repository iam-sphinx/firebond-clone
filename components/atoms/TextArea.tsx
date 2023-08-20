import { ReactElement, useState } from "react";

type TextAreaProps = {
  handleChange2: (e: any) => void;
  label: string;
  handleValue: string;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
};

const TextArea = ({
  label,
  placeholder = "",
  className = "",
  classNameLabel = "",
  classNameInput = "",
  handleChange2,
  handleValue = "",
}: TextAreaProps): ReactElement => {
  // state to hold the current input value
  const [value, setValue] = useState("");

  // function to handle input change events
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // update the state with the new value
    setValue(e.target.value);
  };

  // render the textarea element with a label
  return (
    <div className={`flex flex-col ${className}`}>
      {/* label for the textarea */}
      <label className={`text-sm font-medium text-gray-700 ${classNameLabel}`}>
        {label}
      </label>

      {/* the textarea element itself */}
      <textarea
        value={handleValue} // set the value of the input to the current state
        onChange={handleChange2} // call handleChange on input change events
        placeholder={placeholder}
        className={`px-3 py-2 mt-1 overflow-hidden text-white font-small ${classNameInput}`}
        style={{ height: "150px", resize: "none" }} // set the height of the textarea
      />
    </div>
  );
};

export default TextArea;
