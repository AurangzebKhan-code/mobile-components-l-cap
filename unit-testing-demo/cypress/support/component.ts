import './commands'

import React from 'react'
import { Platform } from 'react-native'
import { mount } from 'cypress/react'

window.global = window;

window.__DEV__ = false;
Cypress.Commands.add('mount', (component, options) => {
  return mount(component, options)
})

