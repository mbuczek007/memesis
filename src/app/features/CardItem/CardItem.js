import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
  },
  cardImage: {
    width: '100%',
    height: 'auto',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardLinked: {
    cursor: 'pointer',
  },
}));

const CardItem = ({ item, linked }) => {
  const classes = useStyles();
  let history = useHistory();

  const viewItemAction = (itemId, item) => {
    if (!linked) {
      return null;
    }

    history.push({
      pathname: `/view/${itemId}`,
      item,
    });
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant='h5'
          component='h2'
          onClick={() => viewItemAction(item.id, item)}
          className={clsx(classes.cardTitle, linked && classes.cardLinked)}
        >
          {item.title}
        </Typography>
      </CardContent>
      <img
        src={item.imageUrl}
        alt=''
        className={clsx(classes.cardImage, linked && classes.cardLinked)}
        onClick={() => viewItemAction(item.id, item)}
      />
      <CardActions>
        <Icon style={{ color: green[500] }}>add_circle</Icon>
        <Icon color='secondary'>remove_circle</Icon>
      </CardActions>
    </Card>
  );
};

export default CardItem;
