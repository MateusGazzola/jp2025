// RTX 5090 Landing Page JavaScript
const bootstrap = window.bootstrap // Declare the bootstrap variable

document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.getElementById("mainNav")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Basic validation
    if (!name || !email || !message) {
      showAlert("Por favor, preencha todos os campos.", "danger")
      return
    }

    if (!isValidEmail(email)) {
      showAlert("Por favor, insira um e-mail válido.", "danger")
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
    submitBtn.disabled = true

    setTimeout(() => {
      showAlert("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })

  // CTA buttons click handling
  const ctaButtons = document.querySelectorAll(".cta-button, .btn-primary")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.textContent.includes("Comprar") || this.textContent.includes("Compre")) {
        e.preventDefault()
        showPurchaseModal()
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".testimonial-card, .spec-item, .pricing-card, .accordion-item")
  animateElements.forEach((el) => observer.observe(el))

  // Auto-advance testimonials carousel
  const testimonialsCarousel = document.getElementById("testimonialsCarousel")
  if (testimonialsCarousel) {
    const carousel = new bootstrap.Carousel(testimonialsCarousel, {
      interval: 5000,
      wrap: true,
    })
  }

  // FAQ accordion enhancement
  const accordionButtons = document.querySelectorAll(".accordion-button")

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add analytics tracking here if needed
      console.log("FAQ clicked:", this.textContent.trim())
    })
  })

  // Pricing card hover effects
  const pricingCard = document.querySelector(".pricing-card")
  if (pricingCard) {
    pricingCard.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    pricingCard.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  }

  // Social media links tracking
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const platform = this.querySelector("i").className
      console.log("Social media clicked:", platform)
      // Add actual social media URLs here
      showAlert("Redirecionando para nossa página nas redes sociais...", "info")
    })
  })
})

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showAlert(message, type = "info") {
  // Create alert element
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px;"

  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(alertDiv)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, 5000)
}

function showPurchaseModal() {
  // Create modal for purchase simulation
  const modalHTML = `
        <div class="modal fade" id="purchaseModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-shopping-cart me-2"></i>Finalizar Compra
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="/rtx-5090-product-box.png" alt="RTX 5090" class="img-fluid mb-3">
                        <h4>RTX 5090 Founders Edition</h4>
                        <p class="text-muted">24GB GDDR6X | Boost Clock 2.5GHz</p>
                        <div class="price-display mb-4">
                            <span class="h2 text-primary">R$ 8.999,00</span>
                            <small class="text-muted d-block">ou 12x de R$ 749,92 sem juros</small>
                        </div>
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Esta é uma demonstração. Para compras reais, entre em contato conosco.
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-primary btn-lg" onclick="simulatePurchase()">
                            <i class="fas fa-credit-card me-2"></i>Simular Compra
                        </button>
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Continuar Navegando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `

  // Remove existing modal if any
  const existingModal = document.getElementById("purchaseModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML)

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("purchaseModal"))
  modal.show()
}

function simulatePurchase() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("purchaseModal"))
  modal.hide()

  setTimeout(() => {
    showAlert("Compra simulada com sucesso! Entre em contato para finalizar seu pedido.", "success")
  }, 500)
}

// Performance optimization
window.addEventListener("load", () => {
  // Lazy load images
  const images = document.querySelectorAll('img[src*="placeholder.svg"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // Add loading animation
        img.style.opacity = "0.5"

        setTimeout(() => {
          img.style.opacity = "1"
          img.style.transition = "opacity 0.3s ease"
        }, 200)

        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Add some interactive features
document.addEventListener("keydown", (e) => {
  // Easter egg: Press 'G' for gaming mode
  if (e.key.toLowerCase() === "g" && e.ctrlKey) {
    document.body.style.filter = "hue-rotate(120deg)"
    showAlert("🎮 Modo Gaming Ativado! Pressione Ctrl+N para voltar ao normal.", "success")
  }

  // Reset with Ctrl+N
  if (e.key.toLowerCase() === "n" && e.ctrlKey) {
    document.body.style.filter = "none"
    showAlert("Modo normal restaurado!", "info")
  }
})
