/* eslint-env mocha */
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { assert } from 'chai'
import { Resolutions } from './resolutions'

if (Meteor.isServer) {
  describe('Resolutions', () => {
    describe('methods', () => {
      const userId = Random.id
      let resolutionId

      beforeEach(() => {
        resolutionId = Resolutions.insert({
          title: 'Test resolution title',
          createdAt: new Date(),
          owner: userId,
          username: 'random-user'
        })
      })

      it('can delete owned resolution', () => {
        const deleteResolution = Meteor.server.method_handlers['resolutions.remove']

        const invocation = { userId }

        deleteResolution.apply(invocation, [resolutionId])

        assert.equal(Resolutions.find().count(), 0)
      })
    })
  })
}
