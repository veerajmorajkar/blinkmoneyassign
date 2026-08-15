const app = require('./app.json');

module.exports = {
  expo: {
    ...app.expo,
    experiments: {
      ...app.expo.experiments,
      ...(process.env.BASE_PATH ? { baseUrl: process.env.BASE_PATH } : {}),
    },
  },
};
