import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Sidebar from './Sidebar.vue'

vi.mock('vue-router', () => ({
  useRoute: () => ({ path: '/novels' })
}))

describe('Sidebar', () => {
  it('renders the categorized sidebar links', () => {
    const wrapper = mount(Sidebar, {
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Video Library')
    expect(wrapper.text()).toContain('Koleksi Novel')
    expect(wrapper.text()).toContain('Scraper Browser')
    expect(wrapper.text()).toContain('File Share')
  })
})
