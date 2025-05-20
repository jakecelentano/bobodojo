import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardEntryForm from '@/components/CardEntryForm.vue'

describe('CardEntryForm.vue', () => {
  it('includes helper button for local images', () => {
    const wrapper = mount(CardEntryForm)
    
    const helperButton = wrapper.find('.helper-button')
    expect(helperButton.exists()).toBe(true)
    expect(helperButton.text()).toBe('Use sample.png')
  })

  it('sets image URL when helper button is clicked', async () => {
    const wrapper = mount(CardEntryForm)
    
    const helperButton = wrapper.find('.helper-button')
    await helperButton.trigger('click')
    
    // Check that the image URL has been set
    const imageUrlInput = wrapper.find('#image_url')
    expect(imageUrlInput.element.value).toContain('.png')
  })

  it('shows helper text for local image usage', () => {
    const wrapper = mount(CardEntryForm)
    
    const helperText = wrapper.find('.helper-text')
    expect(helperText.exists()).toBe(true)
    expect(helperText.text()).toContain('local files')
  })
})