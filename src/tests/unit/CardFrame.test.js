import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CardFrame from '@/components/card/CardFrame.vue'
import { mockMonsterCard, mockLegendaryCard } from '../utils/cardMocks'

describe('CardFrame.vue', () => {
  it('renders with correct color based on attribute', () => {
    const wrapper = mount(CardFrame, {
      props: {
        type: 'Monster',
        compact: false,
        legendary: false
      },
      slots: {
        default: `<div>Test Content</div>`
      },
      global: {
        provide: {
          cardData: mockMonsterCard
        }
      }
    })

    // Test LIGHT attribute should have yellow frame
    expect(wrapper.classes()).toContain('frame-light')
    expect(wrapper.element.style.getPropertyValue('--frame-color')).toBeTruthy()
  })

  it('applies legendary gold border when legendary prop is true', () => {
    const wrapper = mount(CardFrame, {
      props: {
        type: 'Monster',
        compact: false,
        legendary: true
      },
      slots: {
        default: `<div>Test Content</div>`
      }
    })

    expect(wrapper.classes()).toContain('frame-legendary')
  })

  it('includes proper bleed area for print', () => {
    const wrapper = mount(CardFrame, {
      props: {
        type: 'Monster',
        compact: false,
        legendary: false
      }
    })

    // Frame should have bleed area classes
    expect(wrapper.classes()).toContain('frame-bleed')
  })

  it('changes frame color based on different attributes', () => {
    const attributes = {
      'LIGHT': 'frame-light',
      'DARK': 'frame-dark',
      'FIRE': 'frame-fire',
      'WATER': 'frame-water',
      'EARTH': 'frame-earth',
      'WIND': 'frame-wind',
      'DIVINE': 'frame-divine'
    }

    Object.entries(attributes).forEach(([attribute, className]) => {
      const wrapper = mount(CardFrame, {
        props: {
          type: 'Monster',
          compact: false,
          legendary: false
        },
        global: {
          provide: {
            cardData: { ...mockMonsterCard, attribute }
          }
        }
      })

      expect(wrapper.classes()).toContain(className)
    })
  })

  it('applies proper styling for different card types', () => {
    const cardTypes = ['Monster', 'Spell', 'Trap']
    
    cardTypes.forEach(type => {
      const wrapper = mount(CardFrame, {
        props: {
          type,
          compact: false,
          legendary: false
        }
      })

      expect(wrapper.classes()).toContain(`frame-${type.toLowerCase()}`)
    })
  })

  it('handles compact mode correctly', () => {
    const wrapper = mount(CardFrame, {
      props: {
        type: 'Monster',
        compact: true,
        legendary: false
      }
    })

    expect(wrapper.classes()).toContain('frame-compact')
  })
})