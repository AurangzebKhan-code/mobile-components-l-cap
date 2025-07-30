/// <reference types="cypress" />
/// <reference types="cypress/react" />
/// <reference types="../../cypress/support/component.d.ts" />

import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { 
  TLCButton, 
  createButtonConfig, 
} from '../../projects/tlc-components-mobile/tlc-button'
import { TLCClickEvent } from '../../projects/tlc-base'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>
    {children}
  </PaperProvider>
)

describe('TlcButton Component - Visual & Interaction Tests', () => {
  beforeEach(() => {
    cy.intercept('*', (req) => req.continue())
  })

  it('renders visually with correct text and appearance', () => {
    const config = createButtonConfig('tlc-button')
    cy.mount(
      <TestWrapper>
        <TLCButton config={config} />
      </TestWrapper>
    )
    cy.get('[data-testid="tlc-button"]')
      .should('be.visible')
      .and('contain.text', 'Press me')
  })

  it('handles click interactions and event handling', () => {
    const config = createButtonConfig('interaction-test', { label: 'Click Me' })
    let eventCount = 0
    let lastEvent: TLCClickEvent | null = null

    const handleClick = (event: TLCClickEvent): void => {
      eventCount++
      lastEvent = event
    }

    cy.mount(
      <TestWrapper>
        <TLCButton 
          config={config} 
          tlcClick={handleClick}
        />
      </TestWrapper>
    )
    
    cy.get('[data-testid="interaction-test"]')
      .should('be.visible')
      .click()
      .then(() => {
        expect(eventCount).to.equal(1)
        expect(lastEvent).to.not.be.null
        expect(lastEvent?.id).to.equal('interaction-test')
        expect(lastEvent?.label).to.equal('Click Me')
      })
  })

  it('displays different button modes with distinct visual styles', () => {
    const textConfig = createButtonConfig('text-mode-btn', { 
      label: 'Text Button', 
      type: 'BASIC' 
    })
    const outlinedConfig = createButtonConfig('outlined-mode-btn', { 
      label: 'Outlined Button', 
      type: 'STROKED' 
    })
    const containedConfig = createButtonConfig('contained-mode-btn', { 
      label: 'Contained Button', 
      type: 'RAISED' 
    })
    
    cy.mount(
      <TestWrapper>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
          <TLCButton config={textConfig} />
          <TLCButton config={outlinedConfig} />
          <TLCButton config={containedConfig} />
        </div>
      </TestWrapper>
    )
    
    cy.get('[data-testid="text-mode-btn"]').should('be.visible')
    cy.get('[data-testid="outlined-mode-btn"]').should('be.visible')
    cy.get('[data-testid="contained-mode-btn"]').should('be.visible')
  })

  it('shows proper visual states for disabled and loading conditions', () => {
    const disabledConfig = createButtonConfig('disabled-state-btn', { 
      label: 'Disabled Button', 
      disabled: true 
    })
    const loadingConfig = createButtonConfig('loading-state-btn', { 
      label: 'Loading Button', 
      loading: true 
    })
    
    cy.mount(
      <TestWrapper>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
          <TLCButton config={disabledConfig} />
          <TLCButton config={loadingConfig} />
        </div>
      </TestWrapper>
    )
    
    cy.get('[data-testid="disabled-state-btn"]')
      .should('be.visible')
      .and('have.css', 'opacity')
    
    cy.get('[data-testid="loading-state-btn"]')
      .should('be.visible')
      .and('have.css', 'opacity')
  })

  it('displays comprehensive component gallery with all variations', () => {
    cy.mount(
      <TestWrapper>
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '500px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>TLC Button Component Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
            <TLCButton config={createButtonConfig('gallery-primary', { label: 'Primary', color: 'primary', type: 'contained' })} />
            <TLCButton config={createButtonConfig('gallery-secondary', { label: 'Secondary', color: 'secondary', type: 'outlined' })} />
            <TLCButton config={createButtonConfig('gallery-accent', { label: 'Accent', color: 'accent' })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            <TLCButton config={createButtonConfig('gallery-small', { label: 'Small', size: 'small' })} />
            <TLCButton config={createButtonConfig('gallery-large', { label: 'Large', size: 'large' })} />
            <TLCButton config={createButtonConfig('gallery-disabled', { label: 'Disabled', disabled: true })} />
          </div>
        </div>
      </TestWrapper>
    )
    
    cy.get('[data-testid="gallery-primary"]').should('be.visible')
    cy.get('[data-testid="gallery-secondary"]').should('be.visible')
    cy.get('[data-testid="gallery-accent"]').should('be.visible')
    cy.get('[data-testid="gallery-small"]').should('be.visible')
    cy.get('[data-testid="gallery-large"]').should('be.visible')
    cy.get('[data-testid="gallery-disabled"]').should('be.visible').and('be.disabled')
    
    cy.contains('TLC Button Component Gallery').should('be.visible')
  })
})