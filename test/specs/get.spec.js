import get from '../../src/get'

describe('Get', () => {
  describe('Debug messages', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => (true))

    it('shows warning messages in development environment', () => {
      process.env.NODE_ENV = 'development'
      jest.resetModules()

      const get = require('../../src/get').default

      get({}, 'foo.bar')

      expect(console.warn).toBeCalled()
    })

    afterAll(() => {
      jest.restoreAllMocks()
      jest.resetModules()
      process.env.NODE_ENV = 'test'
    })
  })

  describe('Invalid inputs', () => {
    it('uses the fallback value if provided path is not a String or an Array', () => {
      expect(get({}, 1, 'default')).toBe('default')
    })

    it('uses the fallback value if provided source is not an Object or Array', () => {
      expect(get('', 'a.b', 'default')).toBe('default')
      expect(get(2, 'a.b', 'default')).toBe('default')
    })
  })

  describe('Valid inputs', () => {
    const profile = {
      age: 15,
      name: {
        first: 'John'
      },
      activities: ['sports', { name: 'fishing', frequency: 'weekly' }]
    }

    it('provides the entry of an array', () => {
      expect(get(profile, 'activities.0')).toBe('sports')
    })

    it('provides the property of an object', () => {
      expect(get(profile, 'age')).toBe(15)
    })

    it('provides a deeply nested property of an object', () => {
      expect(get(profile, 'name.first')).toBe('John')
    })

    it('supports paths with mixed array and object access using dot notation', () => {
      expect(get(profile, 'activities.1.frequency')).toBe('weekly')
    })

    it('supports paths with mixed array and object access using array of keys', () => {
      expect(get(profile, ['activities', '1', 'frequency'])).toBe('weekly')
    })

    it('returns an empty string if it cannot resolve the path', () => {
      expect(get({}, 'a.b')).toBe('')
    })

    it('returns a fallback if it cannot resolve the path', () => {
      expect(get({}, 'a.b', 'fallback')).toBe('fallback')
    })
  })
})
