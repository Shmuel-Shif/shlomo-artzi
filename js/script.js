const countdownElement = document.getElementById('countdown')
const targetDate = new Date('2025-06-12T21:00:00')

// Keep track of previous values
let prevValues = {
  days: -1,
  hours: -1,
  minutes: -1,
  seconds: -1
}

// Initialize the timer structure
function initializeTimer() {
  countdownElement.innerHTML = `
    <div class="timer-group" id="days-group">
      <div class="timer-number-container">
        <div class="timer-number">
          <div class="timer-number-front">0</div>
          <div class="timer-number-back">0</div>
        </div>
      </div>
      <div class="timer-unit">ימים</div>
    </div>
    <div class="timer-group" id="hours-group">
      <div class="timer-number-container">
        <div class="timer-number">
          <div class="timer-number-front">0</div>
          <div class="timer-number-back">0</div>
        </div>
      </div>
      <div class="timer-unit">שעות</div>
    </div>
    <div class="timer-group" id="minutes-group">
      <div class="timer-number-container">
        <div class="timer-number">
          <div class="timer-number-front">0</div>
          <div class="timer-number-back">0</div>
        </div>
      </div>
      <div class="timer-unit">דקות</div>
    </div>
    <div class="timer-group" id="seconds-group">
      <div class="timer-number-container">
        <div class="timer-number-simple">0</div>
      </div>
      <div class="timer-unit">שניות</div>
    </div>
  `
}

function updateTimeUnit(unit, value, oldValue) {
  const group = document.getElementById(`${unit}-group`)
  if (!group) return

  if (unit === 'seconds') {
    const numberElement = group.querySelector('.timer-number-simple')
    if (numberElement) {
      if (oldValue !== -1 && oldValue !== value) {
        numberElement.classList.add('changed')
        setTimeout(() => numberElement.classList.remove('changed'), 200)
      }
      numberElement.textContent = value
    }
    return
  }

  const numberElement = group.querySelector('.timer-number')
  const frontElement = group.querySelector('.timer-number-front')
  const backElement = group.querySelector('.timer-number-back')
  
  if (!numberElement || !frontElement || !backElement) return

  if (oldValue !== -1 && oldValue !== value) {
    frontElement.textContent = oldValue
    backElement.textContent = value
    numberElement.classList.add('flip')
    
    // Remove the flip class after animation completes
    setTimeout(() => {
      numberElement.classList.remove('flip')
      frontElement.textContent = value
    }, 600)
  } else if (oldValue === -1) {
    frontElement.textContent = value
    backElement.textContent = value
  }
}

function updateCountdown() {
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    clearInterval(interval);
    // Add flash effect before redirect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'white';
    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.5s ease-out';
    flash.style.zIndex = '9999';
    document.body.appendChild(flash);
    
    // Fade out flash and redirect
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'celebration.html';
      }, 500);
    }, 100);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  // Update each unit individually
  updateTimeUnit('days', days, prevValues.days)
  updateTimeUnit('hours', hours, prevValues.hours)
  updateTimeUnit('minutes', minutes, prevValues.minutes)
  updateTimeUnit('seconds', seconds, prevValues.seconds)

  // Update previous values
  prevValues = { days, hours, minutes, seconds }
}

// Initialize the timer structure first
initializeTimer()

// Start the countdown
updateCountdown()
const interval = setInterval(updateCountdown, 1000)