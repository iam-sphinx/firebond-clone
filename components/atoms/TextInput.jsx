import { ReactElement, useState } from 'react';

type TextInputProps = {
  handleChange2:(e)=> void;
  handleValue:string;
  label: string;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
};

const TextInput = ({ label  ,placeholder = '', className = '',classNameLabel='',classNameInput='',handleChange2,handleValue = ''}: TextInputProps): ReactElement => {
  // state to hold the current input value
  const [value, setValue] = useState('');

  // function to handle input change events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update the state with the new value
    setValue(e.target.value);
    
  };

  // render the input element with a label
  return (
    <div className={`flex flex-col ${className}`}>
      {/* label for the input */}
      <label className={`text-sm font-medium text-gray-700 ${classNameLabel}`}>{label}</label>

      {/* the input element itself */}
      <input
        type="text"
        value={handleValue} // set the value of the input to the current state
        onChange={handleChange2} // call handleChange2 on input change events
        placeholder={placeholder}
        className={`px-3 py-2 mt-1 ${classNameInput}`}
      />
    </div>
  );
};

export default TextInput;
