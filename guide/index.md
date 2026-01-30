# @grunnverk/commands-audio - Agentic Guide

## Purpose

Audio transcription and voice commands for kodrdriv. Provides:
- Audio device selection and configuration
- Audio-based commit message generation
- Audio-enhanced code review

## Quick Reference

For AI agents working with this package:
- select-audio: Configure audio input device
- audio-commit: Record/transcribe for commit messages
- audio-review: Record/transcribe for review context

## Key Exports

```typescript
// Audio commands
import { selectAudio, audioCommit, audioReview } from '@grunnverk/commands-audio';

// Execute commands
await selectAudio(config);
await audioCommit(config);
await audioReview(config);
```

## Dependencies

- @grunnverk/core - Core utilities
- @grunnverk/audio-tools - Audio processing
- @grunnverk/ai-service - Transcription
- @utilarium/unplayable - Audio capture

## Command Workflows

### select-audio

1. List available audio devices
2. Prompt user to select device
3. Save configuration

### audio-commit

1. Record audio (or use provided file)
2. Transcribe using AI
3. Generate commit message
4. Delegate to commit command

### audio-review

1. Record audio (or use provided files)
2. Transcribe using AI
3. Add context to review workflow

