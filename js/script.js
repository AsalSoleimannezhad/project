// =================================================================================================================
// COUNTDOWN TIMER
//COUNTDOWN TIMER
// Set the date we're counting down to
// let countDownDate = new Date("July 14, 2023 09:50:40").getTime();
//
// // Update the countdown every 1 second
// let x = setInterval(function () {
//
//     // Get today's date and time
//     let todayDate = new Date().getTime();
//
//     // Get the time difference
//     let timeDifference = countDownDate - todayDate;
//
//     // Time calculations for days, hours, minutes and seconds
//     let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
//
//
//     if (timeDifference > 0 && timeDifference < 10000) {
//         $('#timer').html("Enjoy 50% SALE");
//     } else if (timeDifference < 0) {
//         $('#timer').html("EXPIRED OFFER");
//         clearInterval(x); // Stop the timer
//     } else {
//         $('#timer').html(days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ");
//     }
// }, 1000);
// Set the start and end dates for the special offer
let startDate = new Date("July 17, 2023 00:00:00").getTime();
let endDate = new Date("July 26, 2023 11:10:59").getTime();

// Update the countdown every 1 second
let countDownInterval = setInterval(function () {
    // Get today's date and time
    let todayDate = new Date().getTime();

    // Check if the current time is within the special offer period
    if (todayDate >= startDate && todayDate <= endDate) {
        changeImage();
        $('#offer').html("Special Offer: 50% off!");
        $('#countdown-header').hide();
        clearInterval(countDownInterval);

    } else if (todayDate > endDate) {
        // Special offer has expired
        $('#offer').html("Offer Expired");
        $('#timer').html("");
        $('#countdown-header').hide();
        $('#countdownPicture').hide();
        clearInterval(countDownInterval);

    } else {
        // Special offer has not started yet
        let timeDifference = startDate - todayDate;
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Display the countdown timer
        let countdown = days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ";
        $('#timer').html(countdown);
        $('#offer').html("");
    }
}, 1000);

function changeImage() {
    let imageElement = $('#countdownPicture');
    imageElement.hide();
    let newImage=$('#newImage');
    newImage.attr('src', 'images/specialSalePicture-transformed.png');

}
// =================================================================================================================
// CAROUSEL SLIDESHOW
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const container = document.querySelector('.slides-wrapper');

prevBtn.addEventListener('click', () => {
    container.scrollBy({
        left: -300, behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    container.scrollBy({
        left: 300, behavior: 'smooth'
    });
});


// =================================================================================================================
//     SHOW ALL SLIDES
function showAllSlides() {
    // Show all slides by modifying the CSS display property
    let slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'block';
    }
}


// =================================================================================================================
// SHOP BEAUTY BUTTON , SWEET ALERT
function shopBeauty() {
    Swal.fire({
        title: 'Custom animation with Animate.css', showClass: {
            popup: 'animate__animated animate__fadeInDown'
        }, hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}


// =================================================================================================================
// MODAL
function showModal(value) {
    $("#newArrivalsModal").modal('show');


    let item = $("#" + value.id);
    let dataTitle = item.data('title');
    let priceTitle = item.data('price');


    $('#imageModal').attr('src', './images/' + value.id + '.png');

    $('#newArrivalLabel').html(dataTitle);

    $('#priceModal').html("Total Price: " + priceTitle);
}


// =================================================================================================================
// VERTICAL SLIDESHOW
const sliderContainer = document.querySelector(".slider-container");
const slideRight = document.querySelector(".right-slide");
const slideLeft = document.querySelector(".left-slide");
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");
const slidesLength = slideRight.querySelectorAll("div").length;

let activeSlideIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight;
    if (direction === "up") {
        activeSlideIndex++;
        if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else if (direction === "down") {
        activeSlideIndex--;
        if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
};

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));



// =================================================================================================================
// USER TABLE



let userFieldsDiv = document.getElementById("newUserFields");
let numOfUsers = 0; // Keep track of the number of generated fields

function generateField() {
    numOfUsers++; // Increment the number of users
    let numOfUser = document.getElementById("numNewUser");
    numOfUser.value = numOfUsers; // Update the value of the input field

    let fieldTemplate = `
            <input type="text" name="first_name${numOfUsers}" placeholder="First Name" required>
            <input class="mt-3 mb-3" type="text" name="last_name${numOfUsers}" placeholder="Last Name" required>
            <input type="email" name="email${numOfUsers}" placeholder="Email" required>
            <br>
        `;

    userFieldsDiv.insertAdjacentHTML("beforeend", fieldTemplate);
}




function searchUsers() {
    let searchTerm = document.getElementById("searchTerm").value;

    // Use JavaScript to send a POST request to the search_users.php script
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("searchResults").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "search_users.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("search_term=" + searchTerm);
}