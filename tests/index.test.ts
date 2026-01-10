import { describe, it, expect } from 'vitest';
import * as commands from '../src/index';

describe('commands-audio exports', () => {
    it('should export audioCommit', () => {
        expect(commands.audioCommit).toBeDefined();
        expect(typeof commands.audioCommit).toBe('function');
    });

    it('should export audioReview', () => {
        expect(commands.audioReview).toBeDefined();
        expect(typeof commands.audioReview).toBe('function');
    });

    it('should export selectAudio', () => {
        expect(commands.selectAudio).toBeDefined();
        expect(typeof commands.selectAudio).toBe('function');
    });
});
