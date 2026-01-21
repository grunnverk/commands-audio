# @eldrforge/commands-audio

Audio transcription and voice commands for kodrdriv.

## Installation

```bash
npm install @eldrforge/commands-audio
```

## Commands

### select-audio

Select and configure audio input device.

```bash
kodrdriv select-audio
```

### audio-commit

Record audio and use transcription to create commit message.

```bash
kodrdriv audio-commit
kodrdriv audio-commit --file recording.wav
```

### audio-review

Record audio or process audio files for code review context.

```bash
kodrdriv audio-review
kodrdriv audio-review --file feedback.wav
```

## Usage

```typescript
import { selectAudio, audioCommit, audioReview } from '@eldrforge/commands-audio';

// Select audio device
await selectAudio(config);

// Create commit from audio
await audioCommit(config);

// Add audio context to review
await audioReview(config);
```

## Dependencies

- `@eldrforge/core` - Core utilities and types
- `@eldrforge/audio-tools` - Audio recording and processing
- `@eldrforge/ai-service` - Transcription service
- `@theunwalked/unplayable` - Audio capture library

## License

Apache-2.0


<!-- Build: 2026-01-15 15:59:12 UTC -->
