import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import trigger from './trigger';

describe('trigger commands', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;

  beforeEach(() => {
    const process = mockProcess();
    spawnSpy = sandbox.stub(shell, 'spawnProcess').returns({
      command: 'something',
      finished: true,
      output: 'hi',
      process,
    });
    sandbox.stub(shell, 'checkIfFinished').resolves();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('access method', () => {
    it('should invoke `trigger access --info` if info=true', async () => {
      await trigger.access({ appPath: '/some/path', info: true, triggerId: 'T1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--info', '--trigger-id', 'T1234']),
      );
    });
    it('should invoke `trigger access --app-collaborators` if `appCollaborators` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', appCollaborators: true });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--app-collaborators']),
      );
    });
    it('should invoke `trigger access --everyone` if `everyone` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', everyone: true });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--everyone']),
      );
    });
    it('should invoke `trigger access --grant --users` if `grant` and `users` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', grant: true, users: ['U1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--grant', '--users', 'U1234']),
      );
    });
    it('should invoke `trigger access --revoke --users` if `revoke` and `users` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', revoke: true, users: ['U1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--revoke', '--users', 'U1234']),
      );
    });
    it('should invoke `trigger access --grant --channels` if `grant` and `channels` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', grant: true, channels: ['C1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--grant', '--channels', 'C1234']),
      );
    });
    it('should invoke `trigger access --revoke --channels` if `revoke` and `channels` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', revoke: true, channels: ['C1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--revoke', '--channels', 'C1234']),
      );
    });
    it('should invoke `trigger access --grant --organizations` if `grant` and `organizations` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', grant: true, organizations: ['E1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--grant', '--organizations', 'E1234']),
      );
    });
    it('should invoke `trigger access --revoke --organizations` if `revoke` and `organizations` specified', async () => {
      await trigger.access({ appPath: '/some/path', triggerId: 'T1234', revoke: true, organizations: ['E1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'access', '--revoke', '--organizations', 'E1234']),
      );
    });
  });
  describe('create method', () => {
    it('should invoke `trigger create --trigger-def` if triggerDef specified', async () => {
      await trigger.create({ appPath: '/some/path', triggerDef: 'some/file.json' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'create', '--trigger-def', 'some/file.json']),
      );
    });
    it('should invoke `trigger create --workflow --title` if workflow specified', async () => {
      await trigger.create({ appPath: '/some/path', workflow: 'some#/callback_id', title: 'Title' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'create', '--title', 'Title', '--workflow', 'some#/callback_id']),
      );
    });
    it('should invoke `trigger create --description` if description specified', async () => {
      await trigger.create({
        appPath: '/some/path',
        workflow: 'some#/callback_id',
        title: 'Title',
        description: 'test',
      });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'create', '--description', 'test']),
      );
    });
    it('should invoke `trigger create --interactivity` if interactivity specified', async () => {
      await trigger.create({
        appPath: '/some/path',
        workflow: 'some#/callback_id',
        title: 'Title',
        interactivity: true,
        interactivityName: 'test',
      });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'create', '--interactivity', '--interactivity-name', 'test']),
      );
    });
  });
  describe('delete method', () => {
    it('should invoke `trigger delete --trigger-id`', async () => {
      await trigger.delete({ appPath: '/some/path', triggerId: 'T1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'delete', '--trigger-id', 'T1234']),
      );
    });
  });
  describe('info method', () => {
    it('should invoke `trigger info --trigger-id`', async () => {
      await trigger.info({ appPath: '/some/path', triggerId: 'T1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'info', '--trigger-id', 'T1234']),
      );
    });
  });
  describe('list method', () => {
    it('should invoke `trigger list`', async () => {
      await trigger.list({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match.string, sinon.match.array.contains(['trigger', 'list']));
    });
    it('should invoke `trigger list --limit` if limit specified', async () => {
      await trigger.list({ appPath: '/some/path', limit: 10 });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'list', '--limit', '10']),
      );
    });
    it('should invoke `trigger list --type` if type specified', async () => {
      await trigger.list({ appPath: '/some/path', type: 'event' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'list', '--type', 'event']),
      );
    });
  });
  describe('update method', () => {
    it('should invoke `trigger update --trigger-def` if triggerDef specified', async () => {
      await trigger.update({ appPath: '/some/path', triggerDef: 'some/file.json', triggerId: 'T1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'update', '--trigger-def', 'some/file.json', '--trigger-id', 'T1234']),
      );
    });
    it('should invoke `trigger update --workflow` if workflow specified', async () => {
      await trigger.update({ appPath: '/some/path', workflow: 'some#/callback_id', triggerId: 'T1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'update', '--workflow', 'some#/callback_id', '--trigger-id', 'T1234']),
      );
    });
    it('should invoke `trigger update --title` if title specified', async () => {
      await trigger.update({ appPath: '/some/path', title: 'something', triggerId: 'T1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'update', '--title', 'something', '--trigger-id', 'T1234']),
      );
    });
    it('should invoke `trigger update --description` if description specified', async () => {
      await trigger.update({ appPath: '/some/path', description: 'test', triggerId: 'T1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'update', '--description', 'test', '--trigger-id', 'T1234']),
      );
    });
    it('should invoke `trigger update --interactivity` if interactivity specified', async () => {
      await trigger.update({ appPath: '/some/path', triggerId: 'T1234', interactivity: true });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'update', '--interactivity', '--trigger-id', 'T1234']),
      );
    });
    it('should invoke `trigger update --interactivity-name` if interactivityName specified', async () => {
      await trigger.update({ appPath: '/some/path', triggerId: 'T1234', interactivityName: 'poop' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['trigger', 'update', '--interactivity-name', 'poop', '--trigger-id', 'T1234']),
      );
    });
  });
});
