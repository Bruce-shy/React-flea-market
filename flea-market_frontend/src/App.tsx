import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes/index";
import { Provider } from "react-redux";
import store from "./store";
import styles from "./styles.moudle.less";

import { IconStyle } from "./assets/iconfont/iconfont";

function App() {
  return (
    <div className={styles.wrap}>
      <Provider store={store}>
        <BrowserRouter>
          <IconStyle />
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
