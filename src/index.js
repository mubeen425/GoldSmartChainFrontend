import React from "react";
import "./css/style-sheet.css"
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
// import { store } from "./store/store";
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import ThemeContext from "./context/ThemeContext";
// import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore";

// const persistedStore = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistedStore}> */}
      <SimpleReactLightbox>
        <BrowserRouter >
          <ThemeContext>
            <App />
          </ThemeContext>
        </BrowserRouter>
      </SimpleReactLightbox>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
