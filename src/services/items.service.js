import firebase from '../firebase';

const db = firebase.ref('/items');

class ItemsDataService {
  getAllPending() {
    return db.orderByChild('pending').equalTo(true);
  }

  getAllAccepted() {
    return db.orderByChild('pending').equalTo(false);
  }

  getSingleItem(id) {
    return db.orderByKey().equalTo(id);
  }

  create(item) {
    return db.push(item);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ItemsDataService();
