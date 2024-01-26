/* eslint-disable no-console */

import { afterEach, beforeEach, describe, it } from 'mocha';
import assert from 'assert';
import sinon from 'sinon';

import {
  BaseProtocol,
  MessageBoundaryProtocol,
  getProtocolInterface,
} from './protocols.js';

describe('protocol implementations', () => {
  describe('default protocol', () => {
    it('stubs logging methods with a manifest flag', () => {
      const protocol = BaseProtocol(['--manifest']);
      assert.notEqual(protocol.log, console.log);
      assert.notEqual(protocol.error, console.error);
      assert.notEqual(protocol.warn, console.warn);
      assert.equal(protocol.respond, console.log);
    });

    it('uses console log methods without a manifest', () => {
      const protocol = BaseProtocol(['--flag']);
      assert.equal(protocol.log, console.log);
      assert.equal(protocol.error, console.log);
      assert.equal(protocol.warn, console.log);
      assert.equal(protocol.respond, console.log);
    });
  });

  describe('message boundary protocol', () => {
    /** @type {sinon.SinonStub} */
    let consoleLogStub;

    beforeEach(() => {
      consoleLogStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('errors if no boundary is specified', () => {
      assert.throws(
        () => {
          MessageBoundaryProtocol([]);
        },
        /^Error: No boundary argument provided!$/,
      );
    });

    it('uses the corresponding console methods', () => {
      const protocol = MessageBoundaryProtocol(['--boundary=line']);
      assert.equal(protocol.log, console.log);
      assert.equal(protocol.error, console.error);
      assert.equal(protocol.warn, console.warn);
    });

    it('surrounds hook responses with the boundary', () => {
      const protocol = MessageBoundaryProtocol(['--boundary=x08o']);
      protocol.respond('greetings');
      consoleLogStub.calledWith('x08ogreetingsx08o');
    });
  });

  describe('get protocol interface', () => {
    it('returns the base protocol by default', () => {
      const protocol = getProtocolInterface([]).name;
      assert.equal(protocol, 'default');
    });

    it('returns the base protocol if unrecognized', () => {
      const protocol = getProtocolInterface(['--protocol=cryptics']).name;
      assert.equal(protocol, 'default');
    });

    it('returns the specified message boundary protocol', () => {
      const args = ['--protocol=message-boundaries', '--boundary=racecar'];
      const protocol = getProtocolInterface(args).name;
      assert.equal(protocol, 'message-boundaries');
    });
  });
});
