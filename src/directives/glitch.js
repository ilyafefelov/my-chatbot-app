export const glitch = {
  beforeMount(el) {
    let animationDuration = 1; // The initial duration of the animation in seconds
    let intervalId = null;

    el._onMouseOver = () => {
      el.classList.add('glitch');
      el.style.animationDuration = `${animationDuration}s`;
      animationDuration = 0.05; // Reset the duration to 0.05s  
    };

    el._onMouseOut = () => {
      intervalId = setInterval(() => {
        animationDuration += 0.3; // Increase the duration by 0.1s every 100ms
        if (animationDuration >= 1) { // Stop increasing the duration after 5 seconds
          clearInterval(intervalId);
        } else {
          el.style.animationDuration = `${animationDuration}s`;
        }
      }, 100);

      setTimeout(() => {
        el.classList.remove('glitch');
      }, 1200); // Remove the glitch class after 5 minutes
    };

    el.addEventListener('mouseover', el._onMouseOver);
    el.addEventListener('mouseout', el._onMouseOut);
  },
  mounted(el) {
    let animationDuration = 1; // The initial duration of the animation in seconds
    let intervalId = null;
    el.classList.add('glitch');
    el.style.animationDuration = `${animationDuration}s`;
    animationDuration = 0.05; // Reset the duration to 0.05s
    //remove the glitch class after 2 seconds 
    setTimeout(() => {
      el.classList.remove('glitch');
    }, 2000 );
  },
  unmounted(el) {
    el.removeEventListener('mouseover', el._onMouseOver);
    el.removeEventListener('mouseout', el._onMouseOut);
  }
};