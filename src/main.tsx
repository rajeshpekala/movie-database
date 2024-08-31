import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./components/redux/store.ts";
import i18n from "./utils/i18n.ts";
import { I18nextProvider } from "react-i18next";

i18n.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);
