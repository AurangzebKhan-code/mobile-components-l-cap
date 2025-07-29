/// <reference types="cypress" />

import { ReactElement } from 'react'
import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}