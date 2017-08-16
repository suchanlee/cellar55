import "!style!css!less!../styles/main.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedDetailPage } from "./components/DetailPage";
import { ConnectedHomePage } from "./components/HomePage";
import { ConnectedAdminPage } from "./components/admin/AdminPage";
import { initialState } from "./initialState";
import { createCellarStore } from "./stores/cellarStore";

const store = createCellarStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={ConnectedHomePage} />
        <Route path="/admin" component={ConnectedAdminPage} />
        <Route path="/wine/:wineId/:slug" component={ConnectedDetailPage} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
