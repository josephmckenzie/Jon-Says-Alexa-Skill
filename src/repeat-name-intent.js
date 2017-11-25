
// repeat-name-intent.js
module.exports = RepeatNameIntent

function RepeatNameIntent (intent, session, response) {
var name = intent.slots.repeatName.value
response.tell(name)
return
}