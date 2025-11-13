import * as React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./i18n";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
     <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
               <App />
          </DndProvider>
     </Provider>
);
