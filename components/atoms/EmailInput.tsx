import { ReactElement, useState } from 'react';

type EmailInputProps = {
  handleChange2:(e:any)=> void;
  handleValue:string;
  label: string;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
};

const EmailInput = ({ label  ,placeholder = '', className = '',classNameLabel='',classNameInput='',handleChange2,handleValue = ''}: EmailInputProps): ReactElement => {
  // state to hold the current input value and error message
  const [value, setValue] = useState(handleValue);
  const [error, setError] = useState('');

  // function to handle input change events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update the state with the new value
    const inputValue = e.target.value;
    setValue(inputValue);

    // validate the input value and update the error message if necessary
    const isValid = /^\S+@\S+\.\S+$/.test(inputValue);
    if (!isValid) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }

    // call the handleChange2 prop if it exists
    if (handleChange2) {
      handleChange2(e);
    }
  };

  // render the input element with a label and error message if applicable
  return (
    <div className={`flex flex-col ${className}`}>
      {/* label for the input */}
      <label className={`text-sm font-medium text-gray-700 ${classNameLabel}`}>{label}</label>

      {/* the input element itself */}
      <input
        type="email"
        value={value} // set the value of the input to the current state
        onChange={handleChange} // call handleChange on input change events
        placeholder={placeholder}
        className={`px-3 py-2 mt-1 ${classNameInput}`}
      />

      {/* error message if applicable */}
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default EmailInput;
