import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonsterCardLayout from '@/components/card/monster/MonsterCardLayout.vue'
import { mockMonsterCard, mockLegendaryCard } from '../utils/cardMocks'

describe('MonsterCardLayout.vue', () => {
  it('displays simplified level as a number in circle', () => {
    const wrapper = mount(MonsterCardLayout, {
      props: {
        card: mockMonsterCard,
        compact: false,
        isLegendary: false
      }
    })

    // Should show level 8 as just the number
    const levelDisplay = wrapper.find('.level-display')
    expect(levelDisplay.exists()).toBe(true)
    expect(levelDisplay.text()).toBe('8')
    expect(levelDisplay.classes()).toContain('level-circle')
  })

  it('shows prominent ATK/DEF with colored backgrounds', () => {
    const wrapper = mount(MonsterCardLayout, {
      props: {
        card: mockMonsterCard,
        compact: false,
        isLegendary: false
      }
    })

    const atkBox = wrapper.find('.stat-atk')
    const defBox = wrapper.find('.stat-def')

    expect(atkBox.exists()).toBe(true)
    expect(defBox.exists()).toBe(true)
    
    // Check text content
    expect(atkBox.text()).toContain('3000')
    expect(defBox.text()).toContain('2500')
    
    // Check styling classes
    expect(atkBox.classes()).toContain('stat-box')
    expect(defBox.classes()).toContain('stat-box')
  })

  it('displays Legend tag when card is legendary', () => {
    const wrapper = mount(MonsterCardLayout, {
      props: {
        card: mockLegendaryCard,
        compact: false,
        isLegendary: true
      }
    })

    const legendTag = wrapper.find('.legend-tag')
    expect(legendTag.exists()).toBe(true)
    expect(legendTag.text()).toBe('LEGEND')
  })

  it('properly formats the type header (Dragon/Normal)', () => {
    const wrapper = mount(MonsterCardLayout, {
      props: {
        card: mockMonsterCard,
        compact: false,
        isLegendary: false
      }
    })

    const typeHeader = wrapper.find('.type-header')
    expect(typeHeader.exists()).toBe(true)
    // The CSS uses text-transform: uppercase, so check the actual text values
    expect(typeHeader.text()).toContain('Dragon')
    expect(typeHeader.text()).toContain('Normal')
    expect(typeHeader.text()).toContain('/')
  })

  it('applies attribute emblem correctly', () => {
    const wrapper = mount(MonsterCardLayout, {
      props: {
        card: mockMonsterCard,
        compact: false,
        isLegendary: false
      }
    })

    const attributeEmblem = wrapper.find('.attribute-emblem')
    expect(attributeEmblem.exists()).toBe(true)
    expect(attributeEmblem.classes()).toContain('emblem-light')
  })

  it('handles compact mode appropriately', () => {
    const wrapper = mount(MonsterCardLayout, {
      props: {
        card: mockMonsterCard,
        compact: true,
        isLegendary: false
      }
    })

    // In compact mode, some elements might be hidden or smaller
    expect(wrapper.classes()).toContain('compact-layout')
    
    // Level should still be visible in compact mode
    const levelDisplay = wrapper.find('.level-display')
    expect(levelDisplay.exists()).toBe(true)
  })
})