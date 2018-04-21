import get from '../../src/get'

describe('Get', () => {
  describe('Invalid Inputs', () => {
    it('errors out if provided path is not a String', () => {
      expect(get({}, 1, 'default')).toBe('default')
    })

    it('errors out if provided source is not an Object or Array', () => {
      expect(get('', 'a.b', 'default')).toBe('default')
      expect(get(2, 'a.b', 'default')).toBe('default')
    })
  })

  describe('Valid Inputs', () => {
    const profile = {
      age: 15,
      name: {
        first: 'John'
      },
      activities: ['sports', { name: 'fishing', frequency: 'weekly' }]
    }

    it('provides the entry of an array using a property', () => {
      expect(get(profile, 'activities.0')).toBe('sports')
    })

    it('provides the entry of an array using square brackets', () => {
      expect(get(profile, 'activities[0]')).toBe('sports')
    })

    it('provides the property of an object', () => {
      expect(get(profile, 'age')).toBe(15)
    })

    it('provides a deeply nested property of an object', () => {
      expect(get(profile, 'name.first')).toBe('John')
    })

    it('supports paths with mixed array and object access', () => {
      expect(get(profile, 'activities[1].frequency')).toBe('weekly')
    })

    it('returns an empty string if it cannot resolve the path', () => {
      expect(get({}, 'a.b')).toBe('')
    })

    it('returns a fallback if it cannot resolve the path', () => {
      expect(get({}, 'a.b', 'fallback')).toBe('fallback')
    })
  })
})
