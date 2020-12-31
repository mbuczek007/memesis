import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';

const PasswordInput = ({ id, onInputChange, passwordValue }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant='outlined' fullWidth margin='normal'>
      <InputLabel htmlFor={id}>Hasło*</InputLabel>
      <OutlinedInput
        id={id}
        autoComplete='current-password'
        required
        type={showPassword ? 'text' : 'password'}
        value={passwordValue}
        onChange={onInputChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              edge='end'
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={46}
      />
    </FormControl>
  );
};

export default PasswordInput;
