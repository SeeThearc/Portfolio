// An original, unhurried soft-key arrangement. Render once; playback uses one
// looping buffer instead of running a note scheduler alongside the interface.
export async function createReadingMusic(context) {
  const duration = 48
  const tail = 6
  const rate = 22050
  const offline = new OfflineAudioContext(2, (duration + tail) * rate, rate)
  const chords = [
    [48, 55, 64], [45, 52, 60], [41, 48, 57], [43, 50, 59],
    [48, 55, 64], [45, 52, 60], [41, 48, 57], [43, 50, 62],
  ]
  const melody = [
    [76, 74, 71], [72, 71, 69], [69, 72, 76], [74, 71, 67],
    [71, 74, 76], [76, 72, 71], [72, 69, 67], [69, 71, 74],
  ]
  function note(midi, start, volume, pan) {
    const envelope = offline.createGain()
    const stereo = offline.createStereoPanner()
    stereo.pan.value = pan
    envelope.connect(stereo)
    stereo.connect(offline.destination)
    envelope.gain.setValueAtTime(0, start)
    envelope.gain.linearRampToValueAtTime(volume, start + .045)
    envelope.gain.exponentialRampToValueAtTime(volume * .35, start + .65)
    envelope.gain.exponentialRampToValueAtTime(.00001, start + 4.8)
    envelope.gain.linearRampToValueAtTime(0, start + 5)
    // A warm fundamental and a very quiet octave, without detuning or drones.
    for (const [harmonic, strength] of [[1, 1], [2, .12]]) {
      const oscillator = offline.createOscillator()
      const partial = offline.createGain()
      oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12) * harmonic
      partial.gain.value = strength
      oscillator.connect(partial)
      partial.connect(envelope)
      oscillator.start(start)
      oscillator.stop(start + 5)
    }
  }
  chords.forEach((chord, bar) => {
    chord.forEach((pitch, index) => note(pitch, bar * 6 + index * .24, .08, -.25))
    melody[bar].forEach((pitch, index) => note(pitch, bar * 6 + .8 + index * 1.7, .105, .2))
  })
  const rendered = await offline.startRendering()
  const loop = context.createBuffer(2, duration * rate, rate)
  for (let channel = 0; channel < 2; channel++) {
    const samples = rendered.getChannelData(channel)
    const output = loop.getChannelData(channel)
    output.set(samples.subarray(0, output.length))
    // Carry the final notes across the loop boundary without a cut or click.
    for (let i = 0; i < tail * rate; i++) output[i] += samples[output.length + i]
  }
  return loop
}
