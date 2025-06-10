const countdownElement = document.getElementById('countdown')
const targetDate = new Date('2025-06-12T19:00:00')

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
    countdownElement.innerHTML = `
      <div class="timer-group">
        <div class="timer-number-container">
          <div class="timer-number-simple">🎤</div>
        </div>
        <div class="timer-unit">עכשיו מתחילה ההופעה!</div>
      </div>`
    clearInterval(interval)
    return
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