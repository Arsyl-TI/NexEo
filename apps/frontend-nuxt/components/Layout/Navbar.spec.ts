import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar.vue'

describe('Navbar', () => {
  it('renders app name and navigation links', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.text()).toContain('NexEo')
    expect(wrapper.text()).toContain('Video')
    expect(wrapper.text()).toContain('Novels')
    expect(wrapper.text()).toContain('Browser')
    expect(wrapper.text()).toContain('Share')
  })
})
