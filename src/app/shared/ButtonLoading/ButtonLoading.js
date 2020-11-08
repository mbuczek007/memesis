import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -12,
  },
}));

const ButtonLoading = (props) => {
  const { loading, ctaText } = props;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        type='submit'
        size='large'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={loading}
      >
        {ctaText}
      </Button>
      {loading && (
        <CircularProgress
          color='primary'
          size={24}
          className={classes.buttonProgress}
        />
      )}
    </div>
  );
};

export default ButtonLoading;
