interface PasswordValidatorProps {
  password: string; // Use 'string' instead of 'StringConstructor'
}

export default function PasswordValidator({ password }: PasswordValidatorProps) {
  const validateLength = password.length >= 8;
  const validateNumber = /\d/.test(password); // At least one number
  const validateUppercase = /[A-Z]/.test(password); // At least one uppercase letter
  const validateLowercase = /[a-z]/.test(password); // At least one lowercase letter

  return (
    <div>
      <div>
        <p style={{ color: validateLength ? 'green' : 'red' }}>
          {validateLength ? '✔' : '✖'} min. 8 Zeichen
        </p>
        <p style={{ color: validateNumber ? 'green' : 'red' }}>
          {validateNumber ? '✔' : '✖'} Zahl
        </p>
        <p style={{ color: validateUppercase ? 'green' : 'red' }}>
          {validateUppercase ? '✔' : '✖'} Großbuchstabe
        </p>
        <p style={{ color: validateLowercase ? 'green' : 'red' }}>
          {validateLowercase ? '✔' : '✖'} Kleinbuchstabe
        </p>
      </div>
    </div>
  );
}
