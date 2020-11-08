import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardTitle: {
    cursor: 'pointer',
  },
}));

const CardItem = () => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant='h5'
          component='h2'
          onClick={() => history.push('/view/21')}
          className={classes.cardTitle}
        >
          Heading
        </Typography>
      </CardContent>
      <img
        src='https://source.unsplash.com/random'
        alt=''
        className={classes.cardImage}
        onClick={() => history.push('/view/21')}
      />
      <CardActions>
        <Icon style={{ color: green[500] }}>add_circle</Icon>
        <Icon color='secondary'>remove_circle</Icon>
      </CardActions>
    </Card>
  );
};

export default CardItem;
