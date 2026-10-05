/* =========================================
   SOLAR SYSTEM WEIGHT EXPLORER
========================================= */


/* =========================================
   RANDOM STAR FIELD
========================================= */

const starField = document.getElementById("starField");

const STAR_COUNT = 350;


for (let i = 0; i < STAR_COUNT; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    const size =
        Math.random() * 2 + 0.5;

    star.style.width =
        size + "px";

    star.style.height =
        size + "px";

    star.style.setProperty(
        "--twinkle-duration",
        (Math.random() * 3 + 2) + "s"
    );

    star.style.animationDelay =
        (Math.random() * 4) + "s";

    starField.appendChild(star);

}


/* =========================================
   PLANET DATA
========================================= */

const planetData = {

    Mercury: {

        gravity: 0.38,

        description:
            "The smallest planet and the closest planet to the Sun. Mercury has a very thin atmosphere and extreme temperatures."

    },


    Venus: {

        gravity: 0.91,

        description:
            "A hot world covered by a thick atmosphere. Venus has the hottest surface of any planet in our Solar System."

    },


    Earth: {

        gravity: 1.00,

        description:
            "Our home planet. Earth has liquid water, a protective atmosphere and is the only known world with life."

    },


    Mars: {

        gravity: 0.38,

        description:
            "The Red Planet. Mars is a cold rocky world with enormous volcanoes, deep canyons and evidence of ancient water."

    },


    Jupiter: {

        gravity: 2.34,

        description:
            "The largest planet in the Solar System. Jupiter is a massive gas giant famous for its Great Red Spot."

    },


    Saturn: {

        gravity: 1.06,

        description:
            "A spectacular gas giant surrounded by an enormous system of icy rings."

    },


    Uranus: {

        gravity: 0.92,

        description:
            "An ice giant that rotates almost on its side. Its blue-green color comes from methane in its atmosphere."

    },


    Neptune: {

        gravity: 1.19,

        description:
            "The most distant planet from the Sun. Neptune is a cold blue ice giant with extremely fast winds."

    }

};


/* =========================================
   GET ELEMENTS
========================================= */

const earthWeightInput =
    document.getElementById("earthWeight");

const planetSelect =
    document.getElementById("planetSelect");

const calculateButton =
    document.getElementById("calculateButton");

const errorMessage =
    document.getElementById("errorMessage");

const resultPlanet =
    document.getElementById("resultPlanet");

const weightResult =
    document.getElementById("weightResult");

const infoName =
    document.getElementById("infoName");

const gravityValue =
    document.getElementById("gravityValue");

const infoDescription =
    document.getElementById("infoDescription");

const sun =
    document.getElementById("sun");

const sunPopup =
    document.getElementById("sunPopup");

const closeSunPopup =
    document.getElementById("closeSunPopup");

const continueButton =
    document.getElementById("continueButton");

const solarSystem =
    document.getElementById("solarSystem");


/* =========================================
   UPDATE PLANET INFORMATION
========================================= */

function updatePlanetInfo(planet) {

    const data =
        planetData[planet];

    if (!data) {
        return;
    }

    infoName.textContent =
        planet;

    gravityValue.textContent =
        data.gravity.toFixed(2) + " g";

    infoDescription.textContent =
        data.description;

}


/* =========================================
   CALCULATE WEIGHT
========================================= */

function calculateWeight() {

    const earthWeight =
        parseFloat(
            earthWeightInput.value
        );

    const planet =
        planetSelect.value;


    /* Clear previous error */

    errorMessage.textContent = "";


    /* Check input */

    if (
        isNaN(earthWeight) ||
        earthWeight <= 0
    ) {

        errorMessage.textContent =
            "Please enter a valid Earth weight.";

        earthWeightInput.focus();

        return;

    }


    /* Planet gravity */

    const gravity =
        planetData[planet].gravity;


    /* Calculate */

    const result =
        earthWeight * gravity;


    /* Display */

    resultPlanet.textContent =
        planet;

    weightResult.textContent =
        result.toFixed(2);


    /* Update information */

    updatePlanetInfo(planet);


    /* Small animation */

    weightResult.animate(
        [
            {
                opacity: 0.3,
                transform: "scale(0.9)"
            },

            {
                opacity: 1,
                transform: "scale(1)"
            }
        ],
        {
            duration: 350,
            easing: "ease-out"
        }
    );

}


/* =========================================
   PLANET SELECT CHANGE
========================================= */

planetSelect.addEventListener(
    "change",
    () => {

        const planet =
            planetSelect.value;

        updatePlanetInfo(planet);

        calculateIfWeightExists();

    }
);


/* =========================================
   CALCULATE IF WEIGHT EXISTS
========================================= */

function calculateIfWeightExists() {

    const earthWeight =
        parseFloat(
            earthWeightInput.value
        );

    if (
        !isNaN(earthWeight) &&
        earthWeight > 0
    ) {

        calculateWeight();

    }

}


/* =========================================
   CALCULATE BUTTON
========================================= */

calculateButton.addEventListener(
    "click",
    calculateWeight
);


/* =========================================
   ENTER KEY
========================================= */

earthWeightInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            calculateWeight();

        }

    }
);


/* =========================================
   CLICK PLANET
========================================= */

const planets =
    document.querySelectorAll(
        ".planet"
    );


planets.forEach(
    (planetButton) => {

        planetButton.addEventListener(
            "click",
            (event) => {

                /*
                   Prevent the click from
                   affecting anything else.
                */

                event.stopPropagation();


                const planet =
                    planetButton.dataset.planet;


                /* Select planet */

                planetSelect.value =
                    planet;


                /* Update information */

                updatePlanetInfo(
                    planet
                );


                /*
                   If the user has already
                   entered weight, calculate
                   immediately.
                */

                calculateIfWeightExists();


                /* Highlight planet */

                planets.forEach(
                    p => {
                        p.classList.remove(
                            "selected"
                        );
                    }
                );


                planetButton.classList.add(
                    "selected"
                );

            }
        );

    }
);


/* =========================================
   SUN POPUP
========================================= */

function openSunPopup() {

    sunPopup.classList.add(
        "active"
    );


    /*
       Pause planet movement while
       popup is open.
    */

    document
        .querySelectorAll(".orbit")
        .forEach(
            orbit => {

                orbit.style.animationPlayState =
                    "paused";

            }
        );

}


function closeSunPopupFunction() {

    sunPopup.classList.remove(
        "active"
    );


    /*
       Resume planet movement.
    */

    document
        .querySelectorAll(".orbit")
        .forEach(
            orbit => {

                orbit.style.animationPlayState =
                    "running";

            }
        );

}


/* Sun click */

sun.addEventListener(
    "click",
    openSunPopup
);


/* Close button */

closeSunPopup.addEventListener(
    "click",
    closeSunPopupFunction
);


/* Continue button */

continueButton.addEventListener(
    "click",
    closeSunPopupFunction
);


/* Click outside popup */

sunPopup.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            sunPopup
        ) {

            closeSunPopupFunction();

        }

    }
);


/* Escape key */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            sunPopup.classList.contains(
                "active"
            )
        ) {

            closeSunPopupFunction();

        }

    }
);


/* =========================================
   PLANET SELECT VISUAL SYNC
========================================= */

function selectPlanetVisual(planetName) {

    planets.forEach(
        planet => {

            planet.classList.remove(
                "selected"
            );

        }
    );


    const target =
        document.querySelector(
            `[data-planet="${planetName}"]`
        );


    if (target) {

        target.classList.add(
            "selected"
        );

    }

}


/* =========================================
   SELECT CHANGE VISUAL
========================================= */

planetSelect.addEventListener(
    "change",
    () => {

        selectPlanetVisual(
            planetSelect.value
        );

    }
);


/* =========================================
   INITIAL STATE
========================================= */

updatePlanetInfo("Earth");

selectPlanetVisual("Earth");


// Start with zero result

weightResult.textContent =
    "0.00";


/* =========================================
   OPTIONAL: CLICK SOLAR SYSTEM BACKGROUND
========================================= */

solarSystem.addEventListener(
    "click",
    (event) => {

        /*
           Only react if the user clicked
           the empty space, not a planet.
        */

        if (
            event.target ===
            solarSystem
        ) {

            planets.forEach(
                planet => {

                    planet.classList.remove(
                        "selected"
                    );

                }
            );

        }

    }
);
