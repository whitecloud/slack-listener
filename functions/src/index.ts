import * as functions from "firebase-functions";

// boolean to control ignoring slack bots to prevent loops
const ignoreSlackBots = true;

// list of responses that we could send back
const responses = [
  'I feel like crap on a cracker',
  'I lied about the coming in part',
  'Tube-feeding a cat every four hours',
  'Hmmm, I seem to have developed a wicked cough',
  'I’m running on fumes, gonna go home for a nap',
  'Gonna go pick up one kitty from the vet',
  'Geez, happening again… all of a sudden I’m massively nodding off. Gonna drive home while I can keep my eyes open',
  'I have a vet appointment',
  'Need to do some car stuff, and have a goofy webinar tomorrow morning',
  'No hair emergency, but a cat emergency',
  'Sudden hair emergency',
  'Been fighting a bad headache all day, and I’m losing the battle',
  'Hells bells... more driveway duty',
  'I’m having one of those days where I’m doing more harm than good',
  'So, this is ridiculous…  I’m falling asleep at my desk',
  'I’m in my bunny slippers and I just don’t want to put on shoes',
  'Yet another interaction with the medical community',
  'Pretty whammin’ headache plus the hot-and-colds',
  'Sigh, double emergency (cat plus electrical)',
  'MIGHT have to leave suddenly',
  'Still sorta falling asleep at my desk, plus Justin had to explain to me why it looks like a person burning on the FunSchway tv screen. Anyway, I don’t think work is in the cards for me right now',
  'This is ridiculous. I literally cannot stay awake',
  'Lotta nitrous in the last few days. There’s got to be an easier way to get high',
  'This is WAY past getting old...  I fell again today',
  '😠 <insert some choice swear words in here>  I just slipped on my newly-waxed (not by me) wood floor, and completely screwed up my hip again. Can’t sit, can’t stand, and sure as HELL can’t do stairs',
  'I need drugs, which I unfortunately left at home',
  'Falling asleep at my desk',
  'Gotta get a haircut',
  'Having trouble with my eyes, and I’ve got goop at home that will help',
  'This is ridiculous — I’m literally falling asleep at my desk',
  'Dueling sound systems is making my head throb',
  'Cat poop sleeps for no one',
  'No sleep last night, I’m literally falling asleep on my keyboard.  Gonna nap for a bit, then take a cat to the vet.  I’ll be on again later, and will be in the office (gasp) mañana…'
];

// list of trigger words (case insensitive)
const triggerWords = [
  'WFH',
  'Work from',
  'Working from',
  'Bouncing',
  'I will be in afterwards'
];

/**
 * Intercept slack messages and post a random response whenever
 * the message text contains one of the trigger words
 */
export const helloSlack = functions.https.onRequest((request, response) => {
  if (request) {
    // just logging things
    console.log(request.body);

    // ignore messages from slack bots if ignoreSlackBots === true
    const ignoreMessage = ignoreSlackBots && request.body.user_id === 'USLACKBOT';
    
    // if the message contains one of the trigger words,
    // grab a random response and reply back in the channel
    if (!ignoreMessage && triggered(request.body.text)) {
      const text = responses[Math.floor(Math.random() * responses.length)];
      response.status(200).send({ text });
    }
  } else {
    console.log('Request Error...');
    throw response.status(500);
  }
});

/**
 * Determine if the message contains one of the trigger words
 * @param text the message from slack
 */
function triggered(text: string) {
  const lowercase = text.toLowerCase();
  for (const word of triggerWords) {
    if (lowercase.includes(word.toLowerCase())) {
      return true;
    }
  }
  return false;
}