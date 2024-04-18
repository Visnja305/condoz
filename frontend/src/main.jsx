import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
 	  <ModalProvider>
 		<Provider store={store}>
 		  <App />
 		  <Modal />
 		</Provider>
	  </ModalProvider>
 	</React.StrictMode>

  );


// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";

// import { ModalProvider, Modal } from "./context/Modal";
// import configureStore from "./store";
// import * as sessionActions from "./store/session";
// import App from "./App";

// import "./index.css";

// const store = configureStore();

// if (process.env.NODE_ENV !== "production") {
// 	window.store = store;
// 	window.sessionActions = sessionActions;
// }

// // Wrap the application with the Modal provider and render the Modal component
// // after the App component so that all the Modal content will be layered as
// // HTML elements on top of the all the other HTML elements:
// function Root() {

// 	return (
// 		<ModalProvider>
// 			<Provider store={store}>
// 				<BrowserRouter>
// 					<App />
// 					<Modal />
// 				</BrowserRouter>
// 			</Provider>
// 		</ModalProvider>
// 	);
// }

// ReactDOM.render(
// 	<React.StrictMode>
// 		<Root />
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );







// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { ModalProvider, Modal } from "./context/Modal";
// import configureStore from "./store";
// import { restoreCSRF, csrfFetch } from "./store/csrf";
// import * as sessionActions from "./store/session";
// import App from "./App";

// import "./index.css";

// const store = configureStore();

// if (import.meta.env.MODE !== "production") {
// 	restoreCSRF();

// 	window.csrfFetch = csrfFetch;
// 	window.store = store;
// 	window.sessionActions = sessionActions;
//   }

//   ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 	  <ModalProvider>
// 		<Provider store={store}>
// 		  <App />
// 		  <Modal />
// 		</Provider>
// 	  </ModalProvider>
// 	</React.StrictMode>
//   );
