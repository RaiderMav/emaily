const mongoose = require('mongoose'),
    requireLogin = require('../middlewares/requireLogin'),
    requireCredits = require('../middlewares/requireCredits'),
    Mailer = require('../services/Mailer'),
    surveyTemplate = require('../services/emailTemplates/surveyTemplate'),
    Survey = mongoose.model('surveys')

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send(`Thank you for voting`)
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients} = req.body,

            survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients.split(',').map(email => ({
                    email: email.trim()
                })),
                _user: req.user.id,
                dateSent: Date.now()
            }),

            // Great place to send an email!
            mailer = new Mailer(survey, surveyTemplate(survey))
        try {
            await mailer.send()
            await survey.save()
            req.user.credits -= 1
            const user = await req.user.save()
            res.send(user)
        } catch ( err ) {
            res.status(422).send(err)
        }
    })
}
