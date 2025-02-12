import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
  },
];
