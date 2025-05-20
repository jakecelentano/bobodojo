import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardImage from '@/components/card/CardImage.vue'

describe('CardImage.vue', () => {
  it('displays image with thin bezels', () => {
    const wrapper = mount(CardImage, {
      props: {
        imageUrl: 'https://example.com/test.jpg',
        altText: 'Test image',
        isLegendary: false
      }
    })

    const imageContainer = wrapper.find('.card-image-container')
    expect(imageContainer.exists()).toBe(true)
    expect(imageContainer.classes()).toContain('thin-bezel')
  })

  it('handles responsive image loading', () => {
    const wrapper = mount(CardImage, {
      props: {
        imageUrl: 'https://example.com/test.jpg',
        altText: 'Test image',
        isLegendary: false
      }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/test.jpg')
    expect(img.attributes('alt')).toBe('Test image')
    expect(img.attributes('loading')).toBe('lazy')
  })

  it('applies legendary styling when appropriate', () => {
    const wrapper = mount(CardImage, {
      props: {
        imageUrl: 'https://example.com/test.jpg',
        altText: 'Test image',
        isLegendary: true
      }
    })

    const imageContainer = wrapper.find('.card-image-container')
    expect(imageContainer.classes()).toContain('legendary-image')
  })

  it('maintains proper aspect ratio', () => {
    const wrapper = mount(CardImage, {
      props: {
        imageUrl: 'https://example.com/test.jpg',
        altText: 'Test image',
        isLegendary: false
      }
    })

    const imageContainer = wrapper.find('.card-image-container')
    // Check that the container has aspect ratio styling
    expect(imageContainer.classes()).toContain('aspect-ratio-maintained')
  })
})