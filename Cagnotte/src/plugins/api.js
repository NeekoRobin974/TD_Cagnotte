import axios from "axios";

const apiPlugin = {
  install(app, options) {
    const { baseURL, apiKey } = options;

    const instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${apiKey}`,
      },
    });

    app.config.globalProperties.$api = instance;
  },
};

export default apiPlugin;
