import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReplayControls from '../components/ReplayControls';

describe('ReplayControls', () => {
  it('calls replay handlers correctly', () => {
    const onStartReplay = vi.fn();
    const onStopReplay = vi.fn();
    const onStepForward = vi.fn();
    const onStepBackward = vi.fn();
    const onSeek = vi.fn();

    render(
      <ReplayControls
        isReplayMode={false}
        isPlaying={false}
        cursor={0}
        maxCursor={5}
        onStartReplay={onStartReplay}
        onStopReplay={onStopReplay}
        onStepForward={onStepForward}
        onStepBackward={onStepBackward}
        onSeek={onSeek}
      />
    );

    fireEvent.click(screen.getByText('Play'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Previous'));
    fireEvent.change(screen.getByRole('slider'), { target: { value: '3' } });

    expect(onStartReplay).toHaveBeenCalledTimes(1);
    expect(onStepForward).toHaveBeenCalledTimes(1);
    expect(onStepBackward).toHaveBeenCalledTimes(1);
    expect(onSeek).toHaveBeenCalledWith(3);
  });

  it('shows stop button while replay is playing', () => {
    render(
      <ReplayControls
        isReplayMode={true}
        isPlaying={true}
        cursor={2}
        maxCursor={5}
        onStartReplay={vi.fn()}
        onStopReplay={vi.fn()}
        onStepForward={vi.fn()}
        onStepBackward={vi.fn()}
        onSeek={vi.fn()}
      />
    );

    expect(screen.getByText('Stop')).toBeInTheDocument();
  });
});