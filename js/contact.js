const API_URL = "https://lemweccxac.execute-api.ap-southeast-1.amazonaws.com/uat/sendemail";
const TO_ADDRESS = "agus@merimen.com";

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("cf-firstName").value.trim();
  const lastName  = document.getElementById("cf-lastName").value.trim();
  const email     = document.getElementById("cf-email").value.trim();
  const phone     = document.getElementById("cf-phone").value.trim();
  const policy    = document.getElementById("cf-policy").value.trim();
  const enquiry   = document.getElementById("cf-enquiry").value;
  const comments  = document.getElementById("cf-comments").value.trim();
  const consent1  = document.getElementById("cf-consent1").checked;
  const consent2  = document.getElementById("cf-consent2").checked;

  if (document.getElementById("cf-website").value) return;

  const alertEl = document.getElementById("cf-alert");
  function showAlert(msg, type) {
    alertEl.textContent = msg;
    alertEl.className = "cf-alert " + type;
    alertEl.style.display = "block";
    alertEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  if (!firstName || !lastName || !email || !phone || !enquiry || !comments) {
    showAlert("Please fill in all required fields.", "error");
    return;
  }
  if (!consent1 || !consent2) {
    showAlert("Please agree to both consent statements before submitting.", "error");
    return;
  }

  const btn = document.getElementById("cf-submit-btn");
  btn.disabled = true;
  btn.textContent = "Sending…";
  alertEl.style.display = "none";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        contactNumber: phone,
        policyNumber:  policy || "",
        enquiryType:   enquiry,
        comments,
        subject:       "Website Enquiry",
        toaddress:     TO_ADDRESS
      })
    });

    if (res.ok) {
      showAlert("Thank you for your message. We will get back to you shortly.", "success");
      document.getElementById("contactForm").reset();
    } else {
      const body = await res.text();
      showAlert("Submission failed (status " + res.status + "). Please try again or contact us directly.", "error");
      console.error("API error:", res.status, body);
    }
  } catch (err) {
    showAlert("Unable to send your message. Please check your connection and try again.", "error");
    console.error("Network error:", err);
  } finally {
    btn.disabled = false;
    btn.textContent = "Submit";
  }
});

function toggleNav() {
  const nav = document.getElementById("main-nav");
  const header = document.querySelector("header");
  nav.classList.toggle("open");
  header.classList.toggle("nav-open");
}
document.getElementById("main-nav").addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    this.classList.remove("open");
    document.querySelector("header").classList.remove("nav-open");
  }
});
