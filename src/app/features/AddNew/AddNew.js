import React, { useState } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';
import { inputChangeHandler, convertToArray } from '../../utils/utils';
import db from '../../../firebase';

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
    itemImageUrl: {
      elementType: 'input',
      elementConfig: {
        type: 'url',
        placeholder: 'Media Url',
      },
      value: '',
      validation: {
        required: true,
        errorText: 'To nie jest url',
      },
      valid: false,
      touched: false,
    },
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
    itemSubtitle: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Podpis',
      },
      value: '',
      validation: {
        required: false,
        minLength: 3,
        maxLength: 1000,
        errorText: 'Tytuł powinien zawierać minimum 3 znaki',
      },
      valid: false,
      touched: false,
    },
    itemSource: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Źródło',
      },
      value: '',
      validation: {
        required: false,
        minLength: 0,
        maxLength: 500,
        errorText: 'Źródło jest za długie',
      },
      valid: false,
      touched: false,
    },
  };
  const classes = useStyles();
  const { isLoggedIn } = useSelector((state) => state.auth);
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
    /*  e.preventDefault();

    if (formElementsArray.every(checkFormValid)) {
      setStatusInfo({ ...statusInfo, loading: true });

      db.collection('items')
        .doc()
        .set({
          createDate: new Date().getTime(),
          disableComments: false,
          isPending: true,
          isPrivate: false,
          mediaUrl: controls.itemImageUrl.value,
          source: controls.itemSource.value,
          subtitle: controls.itemSubtitle.value,
          title: controls.itemTitle.value,
          titleColor: '#000',
          userId: user.userId,
        })
        .then(function () {
          const updatedStatus = {
            ...statusInfo,
            type: 'success',
            message: 'Mem Został dodany',
            loading: false,
          };
          setStatusInfo(updatedStatus);
          setControls(initialControls);
        })
        .catch(function (error) {
          const updatedStatus = {
            ...statusInfo,
            type: 'error',
            message: error,
            loading: false,
          };
          setStatusInfo(updatedStatus);
          setControls(initialControls);
        });
    } */
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
      {!isLoggedIn ? (
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
