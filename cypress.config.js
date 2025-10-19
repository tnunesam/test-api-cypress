const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",

    async setupNodeEvents(on, config) {
      // 👇 Aqui é o ponto-chave
      config.env.stepDefinitions = "cypress/e2e/step_definitions/**/*.js";

      // 👇 Aqui você passa o 'config' e não um objeto
      await addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      return config;
    },
  },
});
