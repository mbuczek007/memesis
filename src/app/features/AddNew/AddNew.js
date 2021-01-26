import React, { useState, useEffect } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { DebounceInput } from 'react-debounce-input';
import { useSelector, useDispatch } from 'react-redux';
import { inputChangeHandler, convertToArray } from '../../utils/utils';
import ItemService from '../../../services/item.service';
import { clearMessage, setMessage } from '../../../store/reducers/messageSlice';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MediaSource from './MediaSource';
import { checkExternalImage, checkYtVideo } from '../../utils/utils';

const AddNew = () => {
  const initialControls = {
    itemMedia: {
      validation: {
        required: true,
      },
      value: '',
      valid: false,
      touched: false,
    },
    itemTitle: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Tytuł',
      },
      validation: {
        required: true,
        minLength: 3,
        maxLength: 250,
        errorText: 'Tytuł powinien zawierać od 3 do 250 znaków.',
      },
      value: '',
      valid: false,
      touched: false,
    },
    itemSubtitle: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Podpis',
      },
      validation: {
        required: false,
        maxLength: 1500,
        errorText: 'Zbyt długi tytuł.',
      },
      value: '',
      valid: true,
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
        maxLength: 1500,
        errorText: 'Zbyt długie źródło.',
      },
      valid: true,
      touched: false,
    },
  };

  const initialAdditionalSettings = {
    disableComments: false,
    mediaType: 'file',
  };

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [controls, setControls] = useState(initialControls);
  const [additionalSettings, setAdditionalSettings] = useState(
    initialAdditionalSettings
  );
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formElementsArray = convertToArray(controls);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSuccess]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const checkFormValid = (element) => {
    return controls[element.id].valid;
  };

  const handleChangeType = (type) => {
    setAdditionalSettings({
      ...additionalSettings,
      mediaType: type,
    });

    setControls({
      ...controls,
      itemMedia: {
        ...controls.itemMedia,
        value: '',
        touched: false,
        valid: false,
      },
    });
  };

  const handleChangeMediaValue = (value) => {
    setControls({
      ...controls,
      itemMedia: {
        ...controls.itemMedia,
        value: value,
        valid: additionalSettings.mediaType === 'file',
        touched: additionalSettings.mediaType === 'file',
      },
    });

    if (additionalSettings.mediaType === 'url') {
      checkExternalImage(value, (exists) => {
        if (exists) {
          setControls((prevState) => ({
            ...prevState,
            itemMedia: {
              ...prevState.itemMedia,
              valid: true,
              touched: true,
            },
          }));
        } else {
          setControls((prevState) => ({
            ...prevState,
            itemMedia: {
              ...prevState.itemMedia,
              touched: true,
            },
          }));
        }
      });
    } else if (additionalSettings.mediaType === 'yt-video') {
      checkYtVideo(value, (exists) => {
        if (exists) {
          setControls((prevState) => ({
            ...prevState,
            itemMedia: {
              ...prevState.itemMedia,
              valid: true,
              touched: true,
            },
          }));
        } else {
          setControls((prevState) => ({
            ...prevState,
            itemMedia: {
              ...prevState.itemMedia,
              touched: true,
            },
          }));
        }
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (formElementsArray.every(checkFormValid)) {
      dispatch(clearMessage());
      setLoading(true);

      ItemService.createItem(
        controls.itemMedia.value,
        controls.itemTitle.value,
        controls.itemSubtitle.value,
        controls.itemSource.value,
        additionalSettings.mediaType,
        additionalSettings.disableComments,
        user.userData.id,
        user.token
      ).then(
        (data) => {
          setIsSuccess(true);
          dispatch(setMessage({ message: data.message }));
          setLoading(false);
          setControls(initialControls);
          setAdditionalSettings(initialAdditionalSettings);
        },
        (error) => {
          setIsSuccess(false);
          dispatch(setMessage({ message: error.response.data.error }));
          setLoading(false);
        }
      );
    }
  };

  const form = formElementsArray.map((formElement) => {
    return (
      <Grid key={formElement.id} item xs={12} sm={12}>
        {formElement.id === 'itemMedia' ? (
          <MediaSource
            formElement={formElement}
            changeMediaValue={handleChangeMediaValue}
            changeType={handleChangeType}
          />
        ) : (
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
        )}
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
          Dodawanie motywatorów mozliwe jest tylko dla zalogowanych
          uzytkowników.
        </Typography>
      ) : (
        <StyledPaper>
          {message && (
            <Alert
              variant='outlined'
              severity={isSuccess ? 'success' : 'error'}
            >
              {message}
            </Alert>
          )}
          <Typography
            align='center'
            component='h2'
            variant='h5'
            color='inherit'
          >
            Dodaj nowy
          </Typography>
          <form onSubmit={submitHandler} encType='multipart/form-data'>
            <Grid container spacing={3}>
              {form}
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={additionalSettings.disableComments}
                      onChange={(e) => {
                        setAdditionalSettings({
                          ...additionalSettings,
                          [e.target.name]: e.target.checked,
                        });
                      }}
                      name='disableComments'
                    />
                  }
                  label='Wyłącz komentowanie'
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <ButtonLoading
                  isDisabled={
                    !formElementsArray.every(checkFormValid) || loading
                  }
                  loading={loading}
                  ctaText='Dodaj'
                />
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      )}
    </Grid>
  );
};

const StyledPaper = styled(Paper)`
  padding: 30px;
`;

export default AddNew;
