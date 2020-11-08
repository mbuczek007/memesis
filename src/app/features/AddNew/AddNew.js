import React, { useState } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useAuth from '../../hooks/useAuth';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { inputChangeHandler, convertToArray } from '../../utils/utils';
import TextField from '@material-ui/core/TextField';
import { DebounceInput } from 'react-debounce-input';
import ItemsDataService from '../../../services/items.service';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const AddNew = () => {
  const initialControls = {
    itemTitle: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Tytuł',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
        errorText: 'Tytuł zawierać od 3 do 50 znaków',
      },
      valid: false,
      touched: false,
    },
    itemImageUrl: {
      elementType: 'input',
      elementConfig: {
        type: 'url',
        placeholder: 'Adres URL do obrazka',
      },
      value: '',
      validation: {
        required: true,
        errorText: 'Błędny adres url',
      },
      valid: false,
      touched: false,
    },
  };
  const classes = useStyles();
  const { isLogIn, user } = useAuth();
  const [controls, setControls] = useState(initialControls);
  const [statusInfo, setStatusInfo] = useState({
    type: null,
    message: null,
    loading: false,
  });

  const formElementsArray = convertToArray(controls);

  const checkFormValid = (element) => {
    return controls[element.id].valid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (formElementsArray.every(checkFormValid)) {
      let data = {
        title: controls.itemTitle.value,
        imageUrl: controls.itemImageUrl.value,
        pending: true,
        userId: user.userId,
        userName: user.name,
        createDate: new Date().getTime(),
      };

      setStatusInfo({ ...statusInfo, loading: true });

      ItemsDataService.create(data)
        .then(() => {
          const updatedStatus = {
            ...statusInfo,
            type: 'success',
            message: 'Mem Został dodany',
            loading: false,
          };
          setStatusInfo(updatedStatus);
          setControls(initialControls);
        })
        .catch(() => {
          const updatedStatus = {
            ...statusInfo,
            type: 'error',
            message: 'Wystąpił niespodziewany błąd spróbuj ponownie.',
            loading: false,
          };
          setStatusInfo(updatedStatus);
          setControls(initialControls);
        });
    }
  };

  const form = formElementsArray.map((formElement) => {
    return (
      <Grid
        key={formElement.id}
        item
        xs={12}
        sm={12}
        className={classes[formElement.id]}
      >
        <DebounceInput
          debounceTimeout={500}
          element={TextField}
          variant='outlined'
          fullWidth
          type={formElement.config.elementConfig.type}
          label={formElement.config.elementConfig.placeholder}
          helperText={
            !formElement.config.valid && formElement.config.touched
              ? formElement.config.validation.errorText
              : ''
          }
          value={formElement.config.value}
          onChange={(event) =>
            inputChangeHandler(
              event.target.value,
              formElement.id,
              controls,
              setControls
            )
          }
          error={!formElement.config.valid && formElement.config.touched}
          required={formElement.config.validation.required}
          multiline={false}
          rows='4'
        />
      </Grid>
    );
  });

  return (
    <Grid item xs={12} sm={12} md={12}>
      <PageTitle title='Dodaj' />
      {!isLogIn ? (
        <Typography
          variant='h5'
          align='center'
          color='textSecondary'
          component='p'
        >
          Zaloguj się aby dodawać nowe rzeczy.
        </Typography>
      ) : (
        <Paper className={classes.paper}>
          {statusInfo.type && (
            <Alert severity={statusInfo.type}>{statusInfo.message}</Alert>
          )}
          <Typography
            align='center'
            component='h2'
            variant='h5'
            color='inherit'
          >
            Dodaj Nowy Mem
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid className={classes.container} container spacing={3}>
              {form}
              <Grid item xs={12} md={3}>
                <ButtonLoading loading={statusInfo.loading} ctaText='Dodaj' />
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Grid>
  );
};

export default AddNew;
