document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const formMessage = document.getElementById("formMessage");

    togglePassword.addEventListener("click", () => {
        const isPasswordVisible = passwordInput.type === "text";
        passwordInput.type = isPasswordVisible ? "password" : "text";
        togglePassword.textContent = isPasswordVisible ? "Show" : "Hide";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = passwordInput.value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!username || !email || !password || !confirmPassword) {
            formMessage.textContent = "All fields are required.";
            return;
        }

        if (!emailRegex.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            return;
        }

        if (!passwordRegex.test(password)) {
            formMessage.textContent = "Password must be at least 8 characters long and contain both letters and numbers.";
            return;
        }

        if (password !== confirmPassword) {
            formMessage.textContent = "Passwords do not match.";
            return;
        }

        formMessage.style.color = "green";
        formMessage.textContent = "Registration successful!";
        
        form.reset();
        togglePassword.textContent = "Show";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch products");
            return response.json();
        })
        .then(products => {
            const newArrivalsProducts = products.slice(0, 8); 
            const moreProducts = products.slice(8, 16);  

            renderProducts(newArrivalsProducts, "grid1");
            renderProducts(moreProducts, "grid2");
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});

function renderProducts(products, gridId) {
    const grid = document.getElementById(gridId);
    
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product";

        const productImage = product.image_link ? product.image_link : '/images/default-product.png';

        productCard.innerHTML = `
            <img src="${productImage}" alt="${product.name}">
            <div class="prod-holder">
                <h3>${product.name}</h3>
                <p>$${product.price || 'N/A'}</p>
            </div>
        `;

        grid.appendChild(productCard);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burger-menu");
    const navMenu = document.getElementById("navMenu");

    burgerMenu.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const cookieNotification = document.getElementById("cookieNotification");
    const acceptCookiesBtn = document.getElementById("acceptCookiesBtn");

    // Check if cookies have already been accepted
    if (!localStorage.getItem("cookiesAccepted")) {
        cookieNotification.style.display = "flex";
    }

    // Handle cookie acceptance
    acceptCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        cookieNotification.style.display = "none";
    });
});
