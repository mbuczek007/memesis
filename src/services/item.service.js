import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const createItem = (
  itemImageUrl,
  itemTitle,
  itemSubtitle,
  itemSource,
  itemMediaType,
  itemUserId,
  authToken
) => {
  const bodyPayload = {
    title: itemTitle,
    subtitle: itemSubtitle,
    source: itemSource,
    mediaUrl: itemImageUrl,
    mediaType: itemMediaType,
    userId: itemUserId,
  };

  return axios
    .post(
      API_URL + 'item',
      { bodyPayload },
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

const ItemService = {
  createItem,
  getItems,
};

export default ItemService;
