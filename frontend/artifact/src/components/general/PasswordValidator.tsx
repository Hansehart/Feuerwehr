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
        <p style={{ color: validateLength ? '#029902' : '#ea4138' }}>
          {validateLength ? '✔' : '✖'} min. 8 Zeichen
        </p>
        <p style={{ color: validateNumber ? '#029902' : '#ea4138' }}>
          {validateNumber ? '✔' : '✖'} Zahl
        </p>
        <p style={{ color: validateUppercase ? '#029902' : '#ea4138' }}>
          {validateUppercase ? '✔' : '✖'} Großbuchstabe
        </p>
        <p style={{ color: validateLowercase ? '#029902' : '#ea4138' }}>
          {validateLowercase ? '✔' : '✖'} Kleinbuchstabe
        </p>
      </div>
    </div>
  );
}
