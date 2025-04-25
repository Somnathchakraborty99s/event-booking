document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    const events = {
        '2023-11-15': [
            { time: '09:00 AM', booked: false },
            { time: '11:00 AM', booked: false },
            { time: '02:00 PM', booked: true },
            { time: '04:00 PM', booked: false }
        ],
        '2023-11-20': [
            { time: '10:00 AM', booked: false },
            { time: '01:00 PM', booked: false },
            { time: '03:00 PM', booked: true }
        ],
        '2023-11-25': [
            { time: '09:30 AM', booked: false },
            { time: '11:30 AM', booked: true },
            { time: '02:30 PM', booked: false }
        ]
    };
    
    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const todayButton = document.getElementById('today');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalDateElement = document.getElementById('modal-date');
    const timeSlotsElement = document.getElementById('time-slots');
    const submitBookingButton = document.getElementById('submit-booking');
    
    renderCalendar(currentMonth, currentYear);
    
    prevMonthButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    nextMonthButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    todayButton.addEventListener('click', function() {
        const today = new Date();
        currentMonth = today.getMonth();
        currentYear = today.getFullYear();
        renderCalendar(currentMonth, currentYear);
    });
    
    closeModalButton.addEventListener('click', function() {
        bookingModal.style.display = 'none';
    });
    
    submitBookingButton.addEventListener('click', function() {
        const name = document.getElementById('booking-name').value.trim();
        const email = document.getElementById('booking-email').value.trim();
        const phone = document.getElementById('booking-phone').value.trim();
        const notes = document.getElementById('booking-notes').value.trim();
        const selectedSlot = document.querySelector('.time-slot-selected');
        
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        if (!email) {
            alert('Please enter your email');
            return;
        }
        
        if (!phone) {
            alert('Please enter your phone number');
            return;
        }
        
        if (!selectedSlot) {
            alert('Please select a time slot');
            return;
        }
        
        const selectedTime = selectedSlot.dataset.time;
        const bookingDate = modalDateElement.textContent.split(' - ')[1];
        
        console.log('Booking submitted:', {
            date: bookingDate,
            time: selectedTime,
            name,
            email,
            phone,
            notes
        });
        
        alert(`Booking confirmed for ${bookingDate} at ${selectedTime}. We'll send a confirmation to ${email}.`);
        
        bookingModal.style.display = 'none';
        document.getElementById('booking-name').value = '';
        document.getElementById('booking-email').value = '';
        document.getElementById('booking-phone').value = '';
        document.getElementById('booking-notes').value = '';
    });
    
    function renderCalendar(month, year) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        calendarDaysElement.innerHTML = '';
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        for (let i = 0; i < 42; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            if (i < firstDay) {
                const prevDay = prevMonthDays - firstDay + i + 1;
                dayElement.innerHTML = `<div class="day-number">${prevDay}</div>`;
                dayElement.classList.add('other-month');
            } else if (i >= firstDay + daysInMonth) {
                const nextDay = i - firstDay - daysInMonth + 1;
                dayElement.innerHTML = `<div class="day-number">${nextDay}</div>`;
                dayElement.classList.add('other-month');
            } else {
                const day = i - firstDay + 1;
                dayElement.innerHTML = `<div class="day-number">${day}</div>`;
                
                const today = new Date();
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayElement.classList.add('current-day');
                }
                
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                if (events[dateStr]) {
                    const eventsContainer = document.createElement('div');
                    eventsContainer.className = 'day-events';
                    
                    events[dateStr].forEach(event => {
                        const eventElement = document.createElement('div');
                        eventElement.className = event.booked ? 'event-slot event-slot-booked' : 'event-slot event-slot-available';
                        eventElement.textContent = event.time;
                        eventsContainer.appendChild(eventElement);
                    });
                    
                    dayElement.appendChild(eventsContainer);
                }
                
                dayElement.addEventListener('click', function() {
                    openBookingModal(year, month, day);
                });
            }
            
            calendarDaysElement.appendChild(dayElement);
        }
    }
    
    function openBookingModal(year, month, day) {
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            alert("You can't book for past dates.");
            return;
        }
        
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        modalDateElement.textContent = `Book Appointment - ${date.toLocaleDateString('en-US', options)}`;
        
        timeSlotsElement.innerHTML = '';
        
        const slots = events[dateStr] || [
            { time: '09:00 AM', booked: false },
            { time: '11:00 AM', booked: false },
            { time: '02:00 PM', booked: false },
            { time: '04:00 PM', booked: false }
        ];
        
        slots.forEach(slot => {
            const slotElement = document.createElement('button');
            slotElement.className = slot.booked ? 'time-slot time-slot-booked' : 'time-slot';
            slotElement.textContent = slot.time;
            slotElement.dataset.time = slot.time;
            
            if (!slot.booked) {
                slotElement.addEventListener('click', function() {
                    document.querySelectorAll('.time-slot').forEach(el => {
                        el.classList.remove('time-slot-selected');
                    });
                    this.classList.add('time-slot-selected');
                });
            }
            
            timeSlotsElement.appendChild(slotElement);
        });
        
        bookingModal.style.display = 'flex';
    }
  });