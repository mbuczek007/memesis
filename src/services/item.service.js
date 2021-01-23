import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const createItem = (
  itemMedia,
  itemTitle,
  itemSubtitle,
  itemSource,
  itemMediaType,
  disableComments,
  itemUserId,
  authToken
) => {
  return axios
    .post(
      API_URL + 'item',
      {
        title: itemTitle,
        subtitle: itemSubtitle,
        source: itemSource,
        mediaUrl: itemMedia,
        mediaType: itemMediaType,
        disableComments,
        userId: itemUserId,
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getItems = (mode, perPage, offset) => {
  return axios
    .get(API_URL + `items/${mode}/${perPage}/${offset}`)
    .then((response) => {
      return response.data;
    });
};

const getItemById = (id) => {
  return axios.get(API_URL + `item/${id}`).then((response) => {
    return response.data;
  });
};

const itemVote = (itemId, voteValue) => {
  return axios
    .post(API_URL + 'item/vote', { itemId, voteValue })
    .then((response) => {
      return response.data;
    });
};

const itemChangeStatus = (
  itemId,
  itemFirstAcceptedDate,
  status,
  authToken,
  userId
) => {
  return axios
    .put(
      API_URL + 'item/status/change',
      { itemId, itemFirstAcceptedDate, status, userId },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const ItemService = {
  createItem,
  getItems,
  getItemById,
  itemVote,
  itemChangeStatus,
};

export default ItemService;
