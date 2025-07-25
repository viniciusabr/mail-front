import React from 'react';
import formStyles from '../../pages/EmailForm/formStyles';

function FormInput({ type, placeholder, value, onChange, error }) {
  return (
    <div style={formStyles.inputGroup}>
      <input
        type={type}
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
