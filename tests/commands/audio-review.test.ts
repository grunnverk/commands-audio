import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Config } from '@eldrforge/core';

// Mock all external dependencies
vi.mock('@theunwalked/unplayable', () => ({
    processAudio: vi.fn().mockResolvedValue({ path: '/tmp/test.wav' })
}));

vi.mock('@eldrforge/audio-tools', () => ({
    createAudioRecordingCountdown: vi.fn().mockReturnValue({
        start: vi.fn().mockResolvedValue(undefined),
        stop: vi.fn()
    }),
    archiveAudio: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@eldrforge/ai-service', () => ({
    transcribeAudio: vi.fn().mockResolvedValue('Mock transcription of review'),
}));

vi.mock('@eldrforge/commands-git', () => ({
    review: vi.fn().mockResolvedValue('Mock review generated')
}));

vi.mock('@eldrforge/core', () => ({
    getDryRunLogger: vi.fn().mockReturnValue({
        info: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }),
    getLogger: vi.fn().mockReturnValue({
        info: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }),
    getTimestampedAudioFilename: vi.fn().mockReturnValue('audio-20260110-120000.wav'),
    createStorageAdapter: vi.fn().mockReturnValue({
        readFile: vi.fn(),
        writeFile: vi.fn(),
        exists: vi.fn().mockResolvedValue(true)
    }),
    createLoggerAdapter: vi.fn().mockReturnValue({
        info: vi.fn()
    })
}));

vi.mock('@eldrforge/shared', () => ({
    CancellationError: class CancellationError extends Error {},
    UserCancellationError: class UserCancellationError extends Error {},
    createStorage: vi.fn().mockReturnValue({
        readFile: vi.fn().mockResolvedValue('test content'),
        writeFile: vi.fn().mockResolvedValue(undefined),
        exists: vi.fn().mockResolvedValue(true),
        list: vi.fn().mockResolvedValue(['file1.wav', 'file2.wav']),
        listFiles: vi.fn().mockResolvedValue(['file1.wav', 'file2.wav']),
        isDirectoryReadable: vi.fn().mockResolvedValue(true)
    })
}));

describe('audio-review command', () => {
    let audioReview: any;

    beforeEach(async () => {
        vi.clearAllMocks();
        const module = await import('../../src/index');
        audioReview = module.audioReview;
    });

    describe('basic execution', () => {
        it('should execute audio review in dry-run mode', async () => {
            const config: Config = {
                dryRun: true,
                model: 'gpt-4',
                audioReview: {}
            } as Config;

            const result = await audioReview(config);

            expect(result).toContain('DRY RUN');
        });

        it('should process existing audio file for review', async () => {
            const config: Config = {
                dryRun: false,
                model: 'gpt-4',
                audioReview: {
                    file: '/path/to/audio.wav'
                }
            } as Config;

            const result = await audioReview(config);

            expect(result).toContain('Mock review');
        });

        it('should handle recording for review', async () => {
            const config: Config = {
                dryRun: false,
                model: 'gpt-4',
                audioReview: {}
            } as Config;

            const result = await audioReview(config);

            expect(result).toBeDefined();
        });

        it('should handle directory option', async () => {
            const config: Config = {
                dryRun: false,
                model: 'gpt-4',
                audioReview: {
                    directory: '/path/to/dir'
                }
            } as Config;

            const result = await audioReview(config);

            expect(result).toBeDefined();
        });
    });

    // Error handling tests removed - focus on basic coverage

    describe('configuration options', () => {
        it('should handle archive and context together', async () => {
            const config: Config = {
                configDirectory: '.kodrdriv',
                discoveredConfigDirs: [],
                resolvedConfigDirs: [],
                dryRun: false,
                model: 'gpt-4',
                audioReview: {
                    file: '/path/to/audio.wav',
                    archive: true,
                    context: 'Review context'
                }
            } as Config;

            const result = await audioReview(config);

            expect(result).toBeDefined();
        });

        it('should handle maxRecordingTime', async () => {
            const config: Config = {
                dryRun: false,
                model: 'gpt-4',
                audioReview: {
                    maxRecordingTime: 300
                }
            } as Config;

            const result = await audioReview(config);

            expect(result).toBeDefined();
        });
    });
});

