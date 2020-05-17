import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Resolutions = new Mongo.Collection('resolutions')

if (Meteor.isServer) {
  Meteor.publish('resolutions', function resolutionsPublication() {
    return Resolutions.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]
    })
  })
}

Meteor.methods({
  'resolutions.insert'(title) {
    check(title, String)

    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }

    Resolutions.insert({
      title,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    })
  },
  'resolutions.remove'(resolutionId) {
    check(resolutionId, String)

    const resolution = Resolutions.findOne(resolutionId)
    if (resolution.private && resolution.owner !== this.userId) {
      throw new Meteor.Error('Not authorized')
    }

    Resolutions.remove(resolutionId)
  },
  'resolutions.setChecked'(resolutionId, setChecked) {
    check(resolutionId, String)
    check(setChecked, Boolean)

    const resolution = Resolutions.findOne(resolutionId)
    if (resolution.private && resolution.owner !== this.userId) {
      throw new Meteor.Error('Not authorized')
    }

    Resolutions.update(resolutionId, {
      $set: { checked: setChecked },
    })
  },
  'resolutions.setPrivate'(resolutionId, setToPrivate) {
    check(resolutionId, String)
    check(setToPrivate, Boolean)

    const resolution = Resolutions.findOne(resolutionId)

    if (resolution.owner !== this.userId) {
      throw new Meteor.Error('Not authorized')
    }

    Resolutions.update(resolutionId, {
      $set: { private: setToPrivate },
    })
  },
})
