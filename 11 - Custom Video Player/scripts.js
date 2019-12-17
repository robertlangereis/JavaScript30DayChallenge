const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranger = player.querySelectorAll('.player__slider');
const resetPlaybackRate = player.querySelector('.resetPlaybackRate');
progressBar.style.flexBasis = `0%`;
function togglePlay() {
	video.paused ? video.play() : video.pause();
}

function updateButton() {
	toggle.textContent = this.paused ? '►' : '⏸';
}
function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	if (this.name === 'volume') video.volume = parseFloat(this.value);
	if (this.name === 'playbackRate') video.playbackRate = this.value;
	if (this.name === 'resetPlaybackRate') video.playbackRate = 1;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}
function handleScrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
resetPlaybackRate.addEventListener('click', handleRangeUpdate);
progress.addEventListener('click', handleScrub);
let mouseDown = false;
progress.addEventListener('mousemove', e => mouseDown && handleScrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
ranger.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
let mouseDownSlider = false;
ranger.forEach(slider => {
	slider.addEventListener('mousedown', () => (mousedown = true));
	slider.addEventListener('mouseup', () => (mousedown = false));
	slider.addEventListener('mousemove', e => mouseDown && handleRangeUpdate(e));
});
skipButtons.forEach(button => button.addEventListener('click', skip));
