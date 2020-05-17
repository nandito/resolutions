import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Resolutions = new Mongo.Collection('resolutions')

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

    Resolutions.remove(resolutionId)
  },
  'resolutions.setChecked'(resolutionId, setChecked) {
    check(resolutionId, String)
    check(setChecked, Boolean)

    Resolutions.update(resolutionId, {
      $set: { checked: setChecked },
    })
  }
})
