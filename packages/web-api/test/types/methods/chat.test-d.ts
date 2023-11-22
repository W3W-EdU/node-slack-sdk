import { expectError, expectAssignable } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// chat.delete
// -- sad path
expectError(web.chat.delete()); // lacking argument
expectError(web.chat.delete({})); // empty argument
expectError(web.chat.delete({
  channel: 'C1234', // missing ts
}));
expectError(web.chat.delete({
  ts: '1234.56', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.delete>>([{
  channel: 'C1234',
  ts: '1234.56',
}]);

// chat.deleteScheduledMessage
// -- sad path
expectError(web.chat.deleteScheduledMessage()); // lacking argument
expectError(web.chat.deleteScheduledMessage({})); // empty argument
expectError(web.chat.deleteScheduledMessage({
  channel: 'C1234', // missing scheduled_message_id
}));
expectError(web.chat.deleteScheduledMessage({
  scheduled_message_id: 'Q1234', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.deleteScheduledMessage>>([{
  channel: 'C1234',
  scheduled_message_id: 'Q1234',
}]);

// chat.getPermalink
// -- sad path
expectError(web.chat.getPermalink()); // lacking argument
expectError(web.chat.getPermalink({})); // empty argument
expectError(web.chat.getPermalink({
  channel: 'C1234', // missing message_ts
}));
expectError(web.chat.getPermalink({
  message_ts: '1234.56', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.getPermalink>>([{
  channel: 'C1234',
  message_ts: '1234.56',
}]);

// chat.meMessage
// -- sad path
expectError(web.chat.meMessage()); // lacking argument
expectError(web.chat.meMessage({})); // empty argument
expectError(web.chat.meMessage({
  channel: 'C1234', // missing text
}));
expectError(web.chat.meMessage({
  text: '1234.56', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.meMessage>>([{
  channel: 'C1234',
  text: '1234.56',
}]);

// chat.postEphemeral
// -- sad path
expectError(web.chat.postEphemeral()); // lacking argument
expectError(web.chat.postEphemeral({})); // empty argument
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing text/attachments/blocks and user
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing text/attachments/blocks
  user: 'U1234',
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing user
  text: 'U1234',
}));
expectError(web.chat.postEphemeral({
  user: 'U1234', // missing channel
  text: 'U1234',
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing user
  blocks: [],
}));
expectError(web.chat.postEphemeral({
  user: 'U1234', // missing channel
  blocks: [],
}));
expectError(web.chat.postEphemeral({
  channel: 'C1234', // missing user
  attachments: [],
}));
expectError(web.chat.postEphemeral({
  user: 'U1234', // missing channel
  attachments: [],
}));
expectError(web.chat.postEphemeral({
  channel: 'C123',
  user: 'U1234',
  attachments: [],
  icon_url: 'someurl.png',
  icon_emoji: 'smile', // cannot use both icon_url and icon_emoji
}));
expectError(web.chat.postEphemeral({
  channel: 'C123',
  user: 'U1234',
  attachments: [],
  icon_url: 'someurl.png',
  as_user: true, // cannot set both as_user=true and icon_url
}));
expectError(web.chat.postEphemeral({
  channel: 'C123',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'smile',
  as_user: true, // cannot set both as_user=true and icon_url
}));
// -- happy path
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  text: '1234.56',
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  blocks: [],
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  as_user: true, // can pass as_user=true if no icon or username fields set
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'smile', // icon can be set on its own...
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'smile',
  as_user: false, // ... or with as_user=false
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_url: 'someurl.png', // icon can be set on its own...
}]);
expectAssignable<Parameters<typeof web.chat.postEphemeral>>([{
  channel: 'C1234',
  user: 'U1234',
  attachments: [],
  icon_emoji: 'someurl.png',
  as_user: false, // ... or with as_user=false
}]);
