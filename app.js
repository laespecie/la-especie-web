document.addEventListener("DOMContentLoaded", () => {
    let allPosts = [];

    // 1. DYNAMIC DATE
    const dateSpan = document.getElementById("current-date");
    if (dateSpan) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        let dateString = today.toLocaleDateString('es-ES', options);
        dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
        dateSpan.innerHTML = `<i class="fa-regular fa-calendar"></i> ${dateString}`;
    }

    // 2. THEME TOGGLE (LIGHT / DARK MODE)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute("data-theme", "dark");
        updateThemeButton(true);
    } else {
        document.documentElement.removeAttribute("data-theme");
        updateThemeButton(false);
    }

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            updateThemeButton(false);
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            updateThemeButton(true);
        }
    });

    function updateThemeButton(isDark) {
        if (isDark) {
            themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i> Modo Claro`;
        } else {
            themeToggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i> Modo Oscuro`;
        }
    }

    // 3. STICKY NAVBAR ON SCROLL
    const navbar = document.getElementById("sticky-navbar");
    const header = document.querySelector(".main-header");
    const topBar = document.querySelector(".top-bar");
    
    if (navbar && header) {
        const stickyThreshold = header.offsetHeight + (topBar ? topBar.offsetHeight : 0);
        window.addEventListener("scroll", () => {
            if (window.scrollY > stickyThreshold) {
                navbar.classList.add("sticky-active");
            } else {
                navbar.classList.remove("sticky-active");
            }
        });
    }

    // 4. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
    }

    // 5. FETCH & RENDER POSTS
    const feedContainer = document.getElementById("news-feed-container");

    fetch('/posts-index.json')
        .then(res => res.json())
        .then(posts => {
            allPosts = posts;
            renderPage();
            renderSidebar();
            renderMascotasBlock();
        })
        .catch(err => {
            console.error("Error loading posts index", err);
            if (feedContainer) {
                // If it's a 404/not built yet (fresh install)
                showEmptyPlaceholder();
            }
        });

    function renderPage(filterCategory = "all", searchQuery = "") {
        if (!feedContainer) return;
        feedContainer.innerHTML = "";

        let filtered = allPosts;

        // Filter by category
        if (filterCategory !== "all") {
            filtered = filtered.filter(p => p.category === filterCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(q) || 
                (p.excerpt && p.excerpt.toLowerCase().includes(q)) || 
                (p.body && p.body.toLowerCase().includes(q))
            );
        }

        if (filtered.length === 0) {
            feedContainer.innerHTML = `
                <div class="empty-feed-card text-center" style="padding: 50px 20px; border: 1px dashed var(--border-color); border-radius: 8px;">
                    <i class="fa-regular fa-folder-open fa-3x" style="color: var(--text-muted); margin-bottom: 15px;"></i>
                    <h3>No se encontraron artículos</h3>
                    <p style="color: var(--text-muted); margin-top: 5px;">No hay noticias que coincidan con la búsqueda o categoría seleccionada.</p>
                </div>
            `;
            return;
        }

        // If we are on Home (Inicio) and not searching: Render standard editorial structure (Hero + Grid)
        if (filterCategory === "all" && !searchQuery) {
            // HERO ARTICLE (First post)
            const hero = filtered[0];
            const heroHtml = createHeroHtml(hero);
            feedContainer.appendChild(heroHtml);

            // SECONDARY GRID (Next two posts)
            if (filtered.length > 1) {
                const secondaryGrid = document.createElement("div");
                secondaryGrid.className = "secondary-grid";
                
                const cardsToRender = filtered.slice(1, 3);
                cardsToRender.forEach(post => {
                    const card = createCardHtml(post);
                    secondaryGrid.appendChild(card);
                });
                
                feedContainer.appendChild(secondaryGrid);
            }
            
            // ADDITIONAL NEWS FEED (Posts from index 3 onwards)
            if (filtered.length > 3) {
                const divider = document.createElement("div");
                divider.className = "section-title-bar";
                divider.style.marginTop = "30px";
                divider.innerHTML = `<span class="section-badge badge-conservation" style="background-color: var(--accent-color);">MÁS NOTICIAS</span>`;
                feedContainer.appendChild(divider);

                const listGrid = document.createElement("div");
                listGrid.className = "secondary-grid";
                listGrid.style.marginTop = "20px";

                filtered.slice(3).forEach(post => {
                    const card = createCardHtml(post);
                    listGrid.appendChild(card);
                });
                feedContainer.appendChild(listGrid);
            }

        } else {
            // Category feed or Search query: Render a clean grid of all matching posts
            const grid = document.createElement("div");
            grid.className = "secondary-grid";
            
            filtered.forEach(post => {
                const card = createCardHtml(post);
                grid.appendChild(card);
            });
            feedContainer.appendChild(grid);
        }
    }

    function showEmptyPlaceholder() {
        feedContainer.innerHTML = `
            <div class="empty-feed-card text-center" style="padding: 60px 20px; border: 2px dashed var(--border-color); border-radius: 8px; background-color: var(--ad-bg);">
                <i class="fa-solid fa-newspaper fa-4x" style="color: var(--text-muted); margin-bottom: 20px;"></i>
                <h2>¡Bienvenido a La Especie! 🐾</h2>
                <p style="color: var(--text-muted); margin: 15px auto; max-width: 500px; font-size: 0.95rem;">
                    El portal de noticias está configurado correctamente. Aún no se han publicado artículos en el administrador.
                </p>
                <a href="/admin/" class="subscribe-btn-top" style="display: inline-block;">Ir al Administrador</a>
            </div>
        `;
    }

    // Helper: Create Hero HTML Card
    function createHeroHtml(post) {
        const div = document.createElement("article");
        div.className = "hero-article";
        
        let categoryColor = "var(--accent-color)";
        if (post.category === "Conservación") categoryColor = "var(--color-conservation)";
        if (post.category === "Mascotas") categoryColor = "var(--color-pets)";
        if (post.category === "Ciencia") categoryColor = "var(--color-science)";
        if (post.category === "Legislación") categoryColor = "var(--color-legislation)";

        const imageHtml = post.image 
            ? `<div class="hero-img-container"><img src="${post.image}" alt="${post.title}" class="article-img"></div>`
            : '';

        const dateStr = formatDate(post.date);

        div.innerHTML = `
            ${imageHtml}
            <div class="hero-body">
                <div style="margin-bottom: 10px;">
                    <span class="section-badge" style="background-color: ${categoryColor}; font-size: 0.65rem;">${post.category.toUpperCase()}</span>
                </div>
                <h1 class="hero-title"><a href="/articulo.html?id=${post.id}">${post.title}</a></h1>
                <p class="hero-excerpt">${post.excerpt || ''}</p>
                <div class="article-meta">
                    <span class="author">Por <strong>${post.author || 'La Especie'}</strong></span>
                    <span class="date"><i class="fa-regular fa-clock"></i> ${dateStr}</span>
                </div>
            </div>
        `;
        return div;
    }

    // Helper: Create Standard Grid Card HTML
    function createCardHtml(post) {
        const card = document.createElement("article");
        card.className = "news-card";

        let categoryColorClass = "category-default";
        if (post.category === "Conservación") categoryColorClass = "category-conservation";
        if (post.category === "Mascotas") categoryColorClass = "category-pets";
        if (post.category === "Ciencia") categoryColorClass = "category-science";
        if (post.category === "Legislación") categoryColorClass = "category-legislation";

        const imageSrc = post.image || 'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&q=80&w=400';
        const dateStr = formatDate(post.date);

        card.innerHTML = `
            <div class="card-img-container">
                <img src="${imageSrc}" alt="${post.title}" class="article-img">
                <span class="card-category ${categoryColorClass}">${post.category.toUpperCase()}</span>
            </div>
            <div class="card-body">
                <h2 class="card-title"><a href="/articulo.html?id=${post.id}">${post.title}</a></h2>
                <p class="card-excerpt">${post.excerpt || ''}</p>
                <div class="article-meta">
                    <span class="author">Por <strong>${post.author || 'La Especie'}</strong></span>
                    <span class="date">${dateStr}</span>
                </div>
            </div>
        `;
        return card;
    }

    function formatDate(dateString) {
        if (!dateString) return 'Hace momentos';
        const dateObj = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString('es-ES', options);
    }

    // 6. RENDER SIDEBAR WIDGETS
    function renderSidebar() {
        // "LO ÚLTIMO" List
        const latestNewsContainer = document.getElementById("latest-news-container");
        if (latestNewsContainer) {
            latestNewsContainer.innerHTML = "";
            if (allPosts.length === 0) {
                latestNewsContainer.innerHTML = '<p class="text-muted" style="font-size: 0.8rem;">Sin novedades.</p>';
                return;
            }
            
            allPosts.slice(0, 4).forEach(post => {
                const dateObj = new Date(post.date);
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                const timeStr = `${hours}:${minutes}`;

                const item = document.createElement("div");
                item.className = "latest-news-item";
                item.innerHTML = `
                    <span class="time">${timeStr}</span>
                    <h4 class="title"><a href="/articulo.html?id=${post.id}">${post.title}</a></h4>
                `;
                latestNewsContainer.appendChild(item);
            });
        }

        // "LO MÁS LEÍDO" List (Ranked list)
        const mostReadContainer = document.getElementById("most-read-container");
        if (mostReadContainer) {
            mostReadContainer.innerHTML = "";
            if (allPosts.length === 0) {
                mostReadContainer.innerHTML = '<p class="text-muted" style="font-size: 0.8rem;">Sin estadísticas de lectura.</p>';
                return;
            }
            
            // Take up to 3 posts to display as most read
            allPosts.slice(0, 3).forEach((post, index) => {
                const item = document.createElement("div");
                item.className = "most-read-item";
                item.innerHTML = `
                    <span class="rank">${index + 1}</span>
                    <h4 class="title"><a href="/articulo.html?id=${post.id}">${post.title}</a></h4>
                `;
                mostReadContainer.appendChild(item);
            });
        }
    }

    // 7. RENDER MASCOTAS SECTION BLOCK
    function renderMascotasBlock() {
        const petsContainer = document.getElementById("pets-category-container");
        if (!petsContainer) return;

        const petPosts = allPosts.filter(p => p.category === "Mascotas");
        petsContainer.innerHTML = "";

        if (petPosts.length === 0) {
            petsContainer.innerHTML = `
                <p class="text-muted" style="grid-column: 1 / -1; text-align: center; padding: 20px;">
                    Aún no hay artículos en la sección de Mascotas.
                </p>
            `;
            return;
        }

        petPosts.slice(0, 3).forEach(post => {
            const card = document.createElement("div");
            card.className = "editorial-card-small";
            
            const imageSrc = post.image || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400';

            card.innerHTML = `
                <img src="${imageSrc}" alt="${post.title}" class="card-small-img">
                <div class="card-small-content">
                    <span class="card-tag">MASCOTAS</span>
                    <h3><a href="/articulo.html?id=${post.id}">${post.title}</a></h3>
                </div>
            `;
            petsContainer.appendChild(card);
        });
    }

    // 8. CATEGORY NAVIGATION CLICKS
    const navAnchors = document.querySelectorAll(".nav-links a, .footer-links-grid a");
    navAnchors.forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = e.target.getAttribute("data-category");
            if (!cat) return;

            // Update active states
            document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
            
            // Find navbar matching element and highlight it
            const matchingNavLink = document.querySelector(`.nav-links a[data-category="${cat}"]`);
            if (matchingNavLink) matchingNavLink.classList.add("active");

            // Update header title in feed
            const feedTitle = document.getElementById("feed-title");
            if (feedTitle) {
                feedTitle.textContent = cat === "all" ? "PORTADA PRINCIPAL" : cat.toUpperCase();
            }

            renderPage(cat);
            
            // Smooth scroll to feed container if mobile
            if (window.innerWidth <= 768) {
                const mainLayout = document.querySelector(".main-content-layout");
                if (mainLayout) {
                    mainLayout.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                const menuToggleIcon = menuToggle.querySelector("i");
                if (menuToggleIcon) menuToggleIcon.className = "fa-solid fa-bars";
            }
        });
    });

    // Handle view all pets link
    const viewAllPets = document.getElementById("view-all-pets");
    if (viewAllPets) {
        viewAllPets.addEventListener("click", (e) => {
            e.preventDefault();
            const matchingNavLink = document.querySelector(`.nav-links a[data-category="Mascotas"]`);
            if (matchingNavLink) matchingNavLink.click();
        });
    }

    // 9. SEARCH BAR LOGIC
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    if (searchInput) {
        const handleSearch = () => {
            const query = searchInput.value.trim();
            const activeCategory = document.querySelector(".nav-links a.active")?.getAttribute("data-category") || "all";
            
            const feedTitle = document.getElementById("feed-title");
            if (feedTitle) {
                feedTitle.textContent = query ? `BÚSQUEDA: "${query}"` : (activeCategory === "all" ? "PORTADA PRINCIPAL" : activeCategory.toUpperCase());
            }
            
            renderPage(activeCategory, query);
        };

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSearch();
            }
        });

        if (searchBtn) {
            searchBtn.addEventListener("click", (e) => {
                e.preventDefault();
                handleSearch();
            });
        }
    }

    // 10. NEWSLETTER SIMULATOR
    const newsletterForm = document.getElementById("newsletter-form");
    const feedbackMsg = document.getElementById("newsletter-feedback");

    if (newsletterForm && feedbackMsg) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("subscriber-email");
            const email = emailInput.value.trim();

            if (email) {
                feedbackMsg.textContent = "Guardando suscripción...";
                feedbackMsg.className = "form-feedback";

                setTimeout(() => {
                    feedbackMsg.textContent = `¡Te has suscrito con éxito! Recibirás los boletines en: ${email}`;
                    feedbackMsg.className = "form-feedback success";
                    emailInput.value = "";
                }, 1200);
            }
        });
    }

    // 11. MODAL LOGIC (Reporteros & Obituarios)
    const modalReporteros = document.getElementById("modal-reporteros");
    const modalObituario = document.getElementById("modal-obituario");
    
    const btnReporteros = document.getElementById("trigger-reporteros-btn");
    const btnObituario = document.getElementById("trigger-obituario-btn");
    const btnObituarioCard = document.getElementById("card-obituario-btn");

    const closeReporteros = document.getElementById("close-reporteros");
    const closeObituario = document.getElementById("close-obituario");

    if (btnReporteros && modalReporteros) {
        btnReporteros.addEventListener("click", () => {
            modalReporteros.style.display = "flex";
        });
    }

    if (closeReporteros && modalReporteros) {
        closeReporteros.addEventListener("click", () => {
            modalReporteros.style.display = "none";
        });
    }

    const openObituario = () => {
        if (modalObituario) modalObituario.style.display = "flex";
    };

    if (btnObituario) btnObituario.addEventListener("click", openObituario);
    if (btnObituarioCard) btnObituarioCard.addEventListener("click", openObituario);

    if (closeObituario && modalObituario) {
        closeObituario.addEventListener("click", () => {
            modalObituario.style.display = "none";
        });
    }

    // Close modals when clicking outside modal content
    window.addEventListener("click", (e) => {
        if (e.target === modalReporteros) modalReporteros.style.display = "none";
        if (e.target === modalObituario) modalObituario.style.display = "none";
    });
});
