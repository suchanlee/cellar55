import "!style!css!less!../styles/main.less";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import { createCellarStore } from "./stores/cellarStore";
import { initialState } from "./initialState";

import { ConnectedAdminPage } from "./components/admin/AdminPage";
import { ConnectedDetailPage } from "./components/DetailPage";
import { ConnectedHomePage } from "./components/HomePage";

const store = createCellarStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={ConnectedHomePage} />
      <Route path="/admin" component={ConnectedAdminPage} />
      <Route path="/wine/:wineId" component={ConnectedDetailPage} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app"),
);
