import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Beranda from './beranda';
import Kontak from './kontak';
import Gallery from '../Pages/Gallery';
import List from './List';
import list2 from './list2';
import Cart from '../Pages/Cart';

const Main = () => (
    <Switch>
        <Route exact path="/" component={Beranda} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/list" component={List} />
        <Route path="/list2" component={list2} />
        <Route path="/cart" component={Cart} />
        <Route path="/kontak" component={Kontak} />

    </Switch>
)

export default Main;