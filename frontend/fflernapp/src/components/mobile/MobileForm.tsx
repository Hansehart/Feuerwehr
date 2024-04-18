import "./MobileFormStyle.css";
import drivingFirefighters from "/src/assets/driving-firefighters-filter.jpg";

interface InputField {
  label: string;
  type: string;
  value?: string;
}

interface MobileFormProps {
  background: boolean;
  fields: InputField[];
  submit: string;
}

export default function MobileForm({
  background,
  fields,
  submit,
}: MobileFormProps) {
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
          <div key={index} className="field-container">
            <label htmlFor={`input-${index}`}>{field.label}</label>
            <input
              id={`input-${index}`}
              type={field.type}
              value={field.value}
            />
          </div>
        ))}
        <input id="submit" type="submit" value={submit}></input>
      </form>
    </section>
  );
}
