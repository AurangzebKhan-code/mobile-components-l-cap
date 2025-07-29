/// <reference types="cypress" />
/// <reference types="cypress/react" />

import { MountOptions, MountReturn } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactElement,
        options?: MountOptions
      ): Cypress.Chainable<MountReturn>
    }
  }
}