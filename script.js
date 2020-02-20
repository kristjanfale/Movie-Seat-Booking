const seats = document.querySelectorAll('.row .seat'); // This returns NodeList(array) of seats
const movieSelect = document.getElementById('movie');
const movieName = document.getElementById('movie-name');
const count = document.getElementById('count');
const total = document.getElementById('total');
const bookBtn = document.querySelector('.book-btn');

////////////////////////////////////////////////

// Update 'count' and 'total'
function updateCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); // Returns Node List of selected seats

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * 6;
}

////////////////////////////////////////////////
// EVENT LISTENERS

// Get movie title and occupied seats
movieSelect.addEventListener('change', function() {
  movieName.innerText = movieSelect.value;

  // Remove any selected seats
  seats.forEach(seat => {
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
    }
    updateCountAndTotal();
  });

  // Get occupied seats
  const occupiedSeats = JSON.parse(
    localStorage.getItem(`${movieSelect.selectedIndex}`)
  ); // JSON to array

  if (occupiedSeats) {
    seats.forEach((seat, index) => {
      // If seat is a occupied seat
      if (occupiedSeats.indexOf(index) !== -1) {
        seat.classList.add('occupied');
      } else {
        seat.classList.remove('occupied');
      }
    });
  } else {
    seats.forEach(seat => {
      seat.classList.remove('occupied');
    });
  }
});

// Select seats
seats.forEach(el => {
  el.addEventListener('click', function() {
    // Can select seats only if movie is picked first and seats are not occupied
    if (movieSelect.selectedIndex > 0 && !el.classList.contains('occupied')) {
      if (el.classList.contains('selected')) {
        el.classList.remove('selected');
        updateCountAndTotal();
      } else {
        el.classList.add('selected');
        updateCountAndTotal();
      }
    }
  });
});

// Book seats
bookBtn.addEventListener('click', function() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); // Returns Node List of selected seats
  const occupiedSeats = document.querySelectorAll('.row .seat.occupied'); // Returns Node List of occupied seats
  const selectedMovie = movieSelect.selectedIndex; // Index of selected movie

  if (!selectedMovie == 0) {
    // [...] - Convert Node List into array
    // .map - returns new array
    const seatsIndex = [...selectedSeats, ...occupiedSeats].map(seat =>
      [...seats].indexOf(seat)
    ); // Returns indexes of selected and occupied seats

    // Store selected and occupied seats to local storage
    localStorage.setItem(`${selectedMovie}`, JSON.stringify(seatsIndex)); // array to JSON

    const selectedSeatsIndex = [...selectedSeats].map(seat =>
      [...seats].indexOf(seat)
    ); // Returns indexes of selected seats

    if (selectedSeatsIndex.length > 0) {
      alert(`You have booked a ticket for ${movieName.innerText}.
        \nYour seats are ${selectedSeatsIndex}.`);

      location.reload(); // refresh page
    } else {
      alert("You didn't select any seats!");
    }
  }
});
