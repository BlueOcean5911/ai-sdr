declare module 'react-audio-player-component' {
  import React from 'react';

  interface AudioPlayerProps {
    src: string;
    controls?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    onEnded?: () => void;
    minimal?: boolean;
    width?: number | string;
    trackHeight?: number;
    barWidth?: number;
    gap?: number;
    visualise?: boolean;
    backgroundColor?: string;
    barColor?: string;
    barPlayedColor?: string;
    skipDuration?: number;
    showLoopOption?: boolean;
    showVolumeControl?: boolean;
    seekBarColor?: string;
    volumeControlColor?: string;
    hideSeekBar?: boolean;
    hideTrackKnobWhenPlaying?: boolean;
    // Add other props as needed
  }

  export class AudioPlayer extends React.Component<AudioPlayerProps> {}
}
