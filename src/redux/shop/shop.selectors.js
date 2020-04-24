import { createSelector } from 'reselect';

const selectShop = state => state.selectShop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);