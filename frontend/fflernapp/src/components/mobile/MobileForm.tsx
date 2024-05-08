import "./MobileFormStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface InputField {
  label?: string; // label element in addition to the input element i. e text before a field for free text
  type: string;
  value?: string; // text inside inputs i. e buttons
  inline?: boolean; // determines if elements should be displayed in a row (against the default: column)
  reverse?: boolean; // true means first input, then label
  selectOptions?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
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
        {fields.map((field, index) => (
          <div
            key={index}
            className={`field-container${field.inline ? "-inline" : ""}`}
          >
            {field.type === "select" ? (
              <>
                <label htmlFor={`input-${index}`}>{field.label}</label>
                <select id={`input-${index}`} size={1}>
                  {field.selectOptions?.map((option, optionIndex) => (
                    <option key={`option-${index}-${optionIndex}`}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                {field.reverse ? (
                  <>
                    <input
                      id={`input-${index}`}
                      type={field.type}
                      value={field.value}
                      onChange={field.onChange}
                      onClick={field.onClick}
                    />
                    <label htmlFor={`input-${index}`}>{field.label}</label>
                  </>
                ) : (
                  <>
                    <label htmlFor={`input-${index}`}>{field.label}</label>
                    <input
                      id={`input-${index}`}
                      type={field.type}
                      value={field.value}
                      onChange={field.onChange}
                      onClick={field.onClick}
                    />
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </form>
    </section>
  );
}
