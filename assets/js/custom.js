document.addEventListener("DOMContentLoaded", function () {

    fetch("/includes/header.html")
        .then(res => res.text())
        .then(data => document.getElementById("header").innerHTML = data);

    fetch("/includes/footer.html")
        .then(res => res.text())
        .then(data => document.getElementById("footer").innerHTML = data);

    // submit contact form from home page
    document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault();

        let form = this;
        let formData = new FormData(form);
        let messageBox = document.getElementById("formMessage");

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                messageBox.innerHTML = "<p style='color:green;'>✅ Message sent successfully!</p>";
                form.reset();
            } else {
                messageBox.innerHTML = "<p style='color:red;'>❌ Something went wrong. Try again.</p>";
            }
        })
        .catch(error => {
            messageBox.innerHTML = "<p style='color:red;'>❌ Network error. Try again.</p>";
        });
    });

    document.addEventListener("DOMContentLoaded", function(){

        const filterButtons = document.querySelectorAll(".filter-btn");
        const projects = document.querySelectorAll(".project-item");

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const filter = button.getAttribute("data-filter");

                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                projects.forEach(project => {

                    const category = project.getAttribute("data-category");

                    if(filter === "all" || category.includes(filter)){
                        project.style.display = "block";
                    } else {
                        project.style.display = "none";
                    }

                });

            });

        });

    });

});