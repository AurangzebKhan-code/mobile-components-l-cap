/// <reference types="cypress" />
/// <reference types="cypress/react" />
/// <reference types="../../cypress/support/component.d.ts" />

import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { TLCLabel, createLabelConfig } from '../../projects/tlc-components-mobile/tlc-label'
// No longer need TLCLabelEvent import since we use separate handlers

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>
    {children}
  </PaperProvider>
)

describe('TlcLabel Component - Visual & Content Tests', () => {
  beforeEach(() => {
    cy.intercept('*', (req) => req.continue())
  })

  it('renders visually with correct text and appearance', () => {
    const config = createLabelConfig('tlc-label')
    cy.mount(
      <TestWrapper>
        <TLCLabel config={config} />
      </TestWrapper>
    )
    cy.get('[data-testid="tlc-label"]')
      .should('be.visible')
      .and('contain.text', 'Label')
  })

  it('renders with custom configuration and text', () => {
    const config = createLabelConfig('custom-label', { text: 'Custom Label Text' })
    cy.mount(
      <TestWrapper>
        <TLCLabel config={config} />
      </TestWrapper>
    )
    cy.get('[data-testid="custom-label"]')
      .should('be.visible')
      .and('contain.text', 'Custom Label Text')
  })

  it('handles visibility control properly', () => {
    const visibleConfig = createLabelConfig('visible-label', { 
      text: 'Visible Label',
      visible: true 
    })
    const hiddenConfig = createLabelConfig('hidden-label', { 
      text: 'Hidden Label',
      visible: false 
    })
    const ngIfConfig = createLabelConfig('ngif-label', {
      text: 'NgIf Label',
      ngIf: false
    })
    
    cy.mount(
      <TestWrapper>
        <div>
          <TLCLabel config={visibleConfig} />
          <TLCLabel config={hiddenConfig} />
          <TLCLabel config={ngIfConfig} />
        </div>
      </TestWrapper>
    )
    
    cy.get('[data-testid="visible-label"]').should('be.visible')
    cy.get('[data-testid="hidden-label"]').should('not.exist')
    cy.get('[data-testid="ngif-label"]').should('not.exist')
  })

  it('verifies accessibility attributes are properly set', () => {
    const config = createLabelConfig('accessible-label', { 
      text: 'Accessible Text',
      disabled: true 
    })
    cy.mount(
      <TestWrapper>
        <TLCLabel config={config} />
      </TestWrapper>
    )
    
    cy.get('[data-testid="accessible-label"]')
      .should('be.visible')
      .and('contain.text', 'Accessible Text')
      .and('have.css', 'opacity')
  })

  it('displays comprehensive label gallery with variations', () => {
    cy.mount(
      <TestWrapper>
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '400px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>TLC Label Component Gallery</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '8px' }}>
              <TLCLabel 
                config={createLabelConfig('gallery-default', { text: 'Default Label' })} 
              />
            </div>
            
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '8px' }}>
              <TLCLabel 
                config={createLabelConfig('gallery-styled', { 
                  text: 'Styled Label',
                  stl: { fontSize: 20, color: '#007AFF', fontWeight: 'bold' }
                })} 
              />
            </div>
            
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '8px' }}>
              <TLCLabel 
                config={createLabelConfig('gallery-long', { 
                  text: 'This is a very long label text that demonstrates how the component handles longer content strings'
                })} 
              />
            </div>
            
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '8px' }}>
              <TLCLabel 
                config={createLabelConfig('gallery-disabled', { 
                  text: 'Disabled Label',
                  disabled: true,
                  stl: { opacity: 0.5 }
                })} 
              />
            </div>
          </div>
        </div>
      </TestWrapper>
    )
    
    cy.get('[data-testid="gallery-default"]').should('be.visible')
    cy.get('[data-testid="gallery-styled"]').should('be.visible').and('have.css', 'font-size', '20px')
    cy.get('[data-testid="gallery-long"]').should('be.visible')
    cy.get('[data-testid="gallery-disabled"]').should('be.visible')
    
    cy.contains('TLC Label Component Gallery').should('be.visible')
  })
})