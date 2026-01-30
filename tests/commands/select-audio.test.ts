import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Config } from '@grunnverk/core';

// Mock all external dependencies
vi.mock('@utilarium/unplayable', () => ({
    selectAndConfigureAudioDevice: vi.fn().mockResolvedValue('Device configured successfully')
}));

vi.mock('@grunnverk/core', () => {
    const mockLogger = {
        info: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        verbose: vi.fn()
    };
    return {
        getDryRunLogger: vi.fn().mockReturnValue(mockLogger),
        getLogger: vi.fn().mockReturnValue(mockLogger)
    };
});

describe('select-audio command', () => {
    let selectAudio: any;

    beforeEach(async () => {
        vi.clearAllMocks();
        const module = await import('../../src/index');
        selectAudio = module.selectAudio;
    });

    describe('basic execution', () => {
        it('should execute select-audio command', async () => {
            const config: Config = {
                model: 'gpt-4'
            } as Config;

            const result = await selectAudio(config);

            expect(result).toBeDefined();
        });

        it('should work in dry-run mode', async () => {
            const config: Config = {
                dryRun: true,
                model: 'gpt-4'
            } as Config;

            const result = await selectAudio(config);

            expect(result).toContain('dry run');
        });

        it('should call selectAndConfigureAudioDevice in live mode', async () => {
            const { selectAndConfigureAudioDevice } = await import('@utilarium/unplayable');

            const config: Config = {
                dryRun: false,
                model: 'gpt-4'
            } as Config;

            await selectAudio(config);

            expect(selectAndConfigureAudioDevice).toHaveBeenCalled();
        });

        it('should pass debug flag to device selector', async () => {
            const { selectAndConfigureAudioDevice } = await import('@utilarium/unplayable');

            const config: Config = {
                dryRun: false,
                debug: true,
                model: 'gpt-4'
            } as Config;

            await selectAudio(config);

            expect(selectAndConfigureAudioDevice).toHaveBeenCalledWith(
                expect.any(String),
                expect.anything(),
                true
            );
        });
    });

    describe('error handling', () => {
        it('should handle device selection errors', async () => {
            const { selectAndConfigureAudioDevice } = await import('@utilarium/unplayable');

            vi.mocked(selectAndConfigureAudioDevice).mockRejectedValueOnce(
                new Error('Device selection failed')
            );

            const config: Config = {
                model: 'gpt-4'
            } as Config;

            await expect(selectAudio(config)).rejects.toThrow('Audio device selection failed');
        });

        it('should handle home directory errors', async () => {
            const { selectAndConfigureAudioDevice } = await import('@utilarium/unplayable');

            vi.mocked(selectAndConfigureAudioDevice).mockRejectedValueOnce(
                new Error('Failed to determine home directory: Access denied')
            );

            const config: Config = {
                model: 'gpt-4'
            } as Config;

            await expect(selectAudio(config)).rejects.toThrow('Failed to determine home directory');
        });
    });
});
