import antfu from '@antfu/eslint-config'

export default antfu(
  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    unocss: true,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
