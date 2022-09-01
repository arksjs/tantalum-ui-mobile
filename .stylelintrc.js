module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  rules: {
    'value-no-vendor-prefix': [
      true,
      {
        ignoreValues: ['box', 'min-device-pixel-ratio']
      }
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(([-_]|--)[a-z0-9]+)*$',
      {
        message:
          'Expected class selector like "pf-a", "pf-a_b" or "type--primary"'
      }
    ],
    'media-feature-name-no-vendor-prefix': null,

    'scss/at-import-partial-extension': 'always',
    'scss/at-import-partial-extension-whitelist': ['scss']
  }
}
