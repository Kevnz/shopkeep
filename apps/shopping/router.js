'use strict';
import { create as createRouter, HistoryLocation } from 'react-router';
import routes from './routes';

export default createRouter({
    location: HistoryLocation,
    routes: routes
});