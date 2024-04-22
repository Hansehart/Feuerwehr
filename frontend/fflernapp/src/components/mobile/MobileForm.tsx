import "./MobileFormStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface InputField {
  label?: string; // label element in addition to the input element i. e text before a field for free text
  type: string;
  value?: string; // text inside inputs i. e buttons
  inline?: boolean; // determines if elements should be displayed in a row (against the default: column)
  reverse?: boolean; // true means first input, then label
  function?: () => void;
}

interface MobileFormProps {
  background: boolean;
  fields: InputField[];
}

export default function MobileForm({ background, fields }: MobileFormProps) {
  return (
    <section
      className="form-section"
      style={
        background
          ? { backgroundImage: `url(${drivingFirefighters})` }
          : { backgroundImage: "none" }
      }
    >
      <form>
        {fields.map((field, index) => [
          field.reverse ? (
            <div
              key={index}
              className={`field-container${field.inline ? "-inline" : ""}`} // ether field-container-inline or just field-container
            >
              <input
                id={`input-${index}`}
                type={field.type}
                value={field.value}
                onClick={field.function}
              />
              <label htmlFor={`input-${index}`}>{field.label}</label>
            </div>
          ) : (
            <div
              key={index}
              className={`field-container${field.inline ? "-inline" : ""}`} // ether field-container-inline or just field-container
            >
              <label htmlFor={`input-${index}`}>{field.label}</label>
              <input
                id={`input-${index}`}
                type={field.type}
                value={field.value}
                onClick={field.function}
              />
            </div>
          ),
        ])}
      </form>
    </section>
  );
}
