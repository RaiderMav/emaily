const choice = 'yes' || 'no'

Survey.updateOne({
    id: surveyId,
    recipients: {
        $elemMatch: {
            email,
            responded: false
        }
    }
}, {
    $inc: {
        [choice]: 1
    },
    $set: {
        'recipients.$.responded': true
    }
})
