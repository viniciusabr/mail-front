import React from 'react';
import formStyles from '../../pages/EmailForm/formStyles';

function FormInput({ type, placeholder, value, onChange, error, name, autoComplete }) {
  return (
    <div style={formStyles.inputGroup}>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          ...formStyles.input,
          ...(error && formStyles.inputError),
        }}
      />
      <p
        style={{
          ...formStyles.errorMessage,
          visibility: error ? 'visible' : 'hidden',
        }}
      >
        {error || 'a'}
      </p>
    </div>
  );
}

export default FormInput;
