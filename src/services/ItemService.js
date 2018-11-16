import { db } from '../components/db';

export const addItem =  (item) => {
    db.ref('/items').push({
        name: item,
        id :5
    });
}
