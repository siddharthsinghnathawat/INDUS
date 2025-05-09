
 document.addEventListener('DOMContentLoaded', function() {
  
    const cars = {
        vx: { name: "INDUS VX", colors: ["black", "silver", "red", "blue"] },
        gt: { name: "INDUS GT", colors: ["black", "silver", "blue"] },
        r: { name: "INDUS R", colors: ["black", "red"] }
    };

    const colorNames = {
        black: "Onyx Black",
        silver: "Platinum Silver",
        red: "Racing Red",
        blue: "Midnight Blue"
    };

    
    let currentModel = "vx";
    let currentColor = "black";
    let currentRotation = 0;
    const totalRotations = 36;


    const carImage = document.getElementById("car-image");
    const selectedModelSpan = document.getElementById("selected-model");
    const selectedColorSpan = document.getElementById("selected-color");


    document.querySelectorAll(".model-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelector(".model-btn.active").classList.remove("active");
            this.classList.add("active");
            currentModel = this.dataset.model;
            updateCarImage();
            selectedModelSpan.textContent = cars[currentModel].name;
        });
    });


    document.querySelectorAll(".color-option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelector(".color-option.active").classList.remove("active");
            this.classList.add("active");
            currentColor = this.dataset.color;
            updateCarImage();
            selectedColorSpan.textContent = colorNames[currentColor];
        });
    });

    
    document.getElementById("rotate-left").addEventListener("click", () => rotateCar(-1));
    document.getElementById("rotate-right").addEventListener("click", () => rotateCar(1));


    let isDragging = false;
    let startX = 0;
    
    carImage.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        if (Math.abs(deltaX) > 5) {
            rotateCar(deltaX > 0 ? 1 : -1);
            startX = e.clientX;
        }
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

   
    function updateCarImage() {
        carImage.src = `cars/${currentModel}/${currentColor}/${currentRotation}.png`;
    }

   
    function rotateCar(direction) {
        currentRotation = (currentRotation + direction + totalRotations) % totalRotations;
        updateCarImage();
    }
});

    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.preloader').style.opacity = '0';
            setTimeout(function() {
                document.querySelector('.preloader').style.display = 'none';
            }, 500);
        }, 2000);
    });


    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.querySelector('.bar').classList.toggle('active');
    });

   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    window.addEventListener('scroll', function() {
        const header = document.querySelector('.sticky-nav');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
