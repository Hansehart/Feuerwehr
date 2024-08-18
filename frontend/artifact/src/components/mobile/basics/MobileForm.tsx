import { useState } from "react";
import PasswordValidator from "../../general/PasswordValidator";
import "./MobileFormStyle.css";
import highwayAccident from "/src/assets/pictures/highway-accident.jpg";

/*
 * Interfaces
 */
interface MobileFormProps {
  identifier?: string; // optional identifier for the form element
  background: boolean; // determines if the form background should be displayed
  classname?: string; // style i. e via tailwind
  fields: InputField[]; // array of fields to be rendered in the form
}

interface InputField {
  label?: string | React.ReactNode; // label element in addition to the input element, e.g., text before a field
  type: string; // type of input, e.g., select, textarea, or other input types
  classname?: string; // classname for styling, e.g., via tailwind
  value?: string; // value of the input field
  placeholder?: string; // placeholder text inside inputs
  inline?: boolean; // determines if elements should be displayed in a row (default is column)
  reverse?: boolean; // if true, label appears after the input
  disabled?: boolean; // if true, input is not editable
  selectOptions?: string[]; // options for select inputs
  passwordValidator?: boolean; // activates password validation
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // change event handler for inputs
  onClick?: () => void; // click event handler for inputs
  onFocus?: () => void; // focus event handler for inputs
}

/*
 * Functions
 */
export default function MobileForm({
  identifier,
  background,
  classname,
  fields,
}: MobileFormProps) {
  const [password, setPassword] = useState(""); // manage the password value for password validator

  // handle change events for input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const field = fields[index];

    // special onChange handler for new component
    if (field.passwordValidator) {
      setPassword(e.target.value); // update password state
    }
    // default onChange handler
    field.onChange?.(e); // call the provided onChange handler if it exists
  };

  // render a single field based on its type
  const renderField = (field: InputField, index: number) => {
    const inputProps = {
      id: `input-${index}`,
      className: field.classname,
      type: field.type,
      value: field.value,
      placeholder: field.placeholder,
      disabled: field.disabled,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e, index),
      onClick: field.onClick,
      onFocus: field.onFocus,
    };

    switch (field.type) {
      case "select":
        return (
          <>
            <label htmlFor={`input-${index}`}>{field.label}</label>
            <select id={`input-${index}`} size={1}>
              {field.selectOptions?.map((option, optionIndex) => (
                <option key={`option-${index}-${optionIndex}`}>{option}</option>
              ))}
            </select>
          </>
        );

      case "textarea":
        return (
          <>
            <label htmlFor={`input-${index}`}>{field.label}</label>
            <textarea id={`input-${index}`} />
          </>
        );

      default:
        return (
          <>
            {field.reverse ? (
              <>
                <input {...inputProps} />
                <label htmlFor={`input-${index}`}>{field.label}</label>
              </>
            ) : (
              <>
                <label htmlFor={`input-${index}`}>{field.label}</label>
                <input {...inputProps} />
                {field.passwordValidator && field.type === "password" ? (
                  <PasswordValidator password={password} />
                ) : null}
              </>
            )}
          </>
        );
    }
  };

  /*
   * Build everything
   */
  return (
    <section className="form-section">
      <div
        className="form-background"
        style={
          background
            ? { backgroundImage: `url(${highwayAccident})` }
            : { backgroundImage: "none" }
        }
      ></div>
      <form id={identifier} className={classname}>
        {fields.map((field, index) => (
          <div
            key={index}
            className={`field-container${field.inline ? "-inline" : ""}`}
          >
            {renderField(field, index)}
          </div>
        ))}
      </form>
    </section>
  );
}
