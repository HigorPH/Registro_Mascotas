document.addEventListener("DOMContentLoaded", () => {
    const serviceSelect = document.getElementById("elementos"); // Es el contenedor para seleccionar y que sea la principal: "Guarderia"
    const extraServices = document.getElementById("extra-services"); // Mostrar los servicios especiales
    const userList = document.createElement("ul"); // Contenedor para la lista de usuarios
    const userSection = document.createElement("section");
    userSection.id = "registered-users";
    userSection.innerHTML = "<h2>Usuarios Registrados</h2>";
    userSection.appendChild(userList);
    document.body.appendChild(userSection);
  
    const users = [];
  
    // Mostrar servicios adicionales solo si se selecciona Guardería
    serviceSelect.addEventListener("change", () => {
      if (serviceSelect.value === "guarderia") {
        extraServices.style.display = "block";
      } else {
        extraServices.style.display = "none";
      }
    });
  
    // Manejar el envío del formulario
    const form = document.getElementById("reservation-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevenir recarga de la página

  
      // Capturar datos del formulario
      const ownerName = document.getElementById("name").value;
      const petName = document.getElementById("pet").value;
      const selectedService = serviceSelect.value;
      const date = document.getElementById("date").value;
  
      // Obtener servicios especiales seleccionados
      const specialServices = Array.from(
        extraServices.querySelectorAll('input[type="checkbox"]:checked')
      ).map((checkbox) => checkbox.value);
  
      // Validación básica
      if (!ownerName || !petName || !selectedService || !date) {
        document.getElementById("message").textContent =
          "Por favor, completa todos los campos.";
        document.getElementById("message").style.color = "red";
        return;
      }
  
      // Crear mensaje de confirmación
      let message = `Reserva confirmada para ${ownerName} y su mascota ${petName}. Servicio: ${selectedService}. Fecha: ${date}.`;
      if (specialServices.length > 0) {
        message += ` Servicios especiales añadidos: ${specialServices.join(", ")}.`;
      }
  
      document.getElementById("message").textContent = message;
      document.getElementById("message").style.color = "green";
  
      // Añadir usuario registrado a la lista
      users.push({ ownerName, petName, selectedService, date, specialServices });
      updateUserList(users);
    });
  
    // Función para actualizar la lista de usuarios registrados
    function updateUserList(users) {
      userList.innerHTML = ""; // Limpiar lista existente
      users.forEach((user) => {
        const listItem = document.createElement("li");
        let specialServicesText =
          user.specialServices.length > 0
            ? ` (Servicios especiales: ${user.specialServices.join(", ")})`
            : "";
        listItem.textContent = `Dueño: ${user.ownerName}, Mascota: ${user.petName}, Servicio: ${user.selectedService}, Fecha: ${user.date}${specialServicesText}`;
        userList.appendChild(listItem);
      });
    }
  
    // Función para manejar el clic en las imágenes del carrusel y mostrar la descripción en el modal
    const carouselItems = document.querySelectorAll('.service-image');
    carouselItems.forEach(item => {
      item.addEventListener('click', function() {
        const service = this.dataset;
  
        const modalImage = document.getElementById("modal-image");
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
  
      
        modalImage.src = `./fotos/${service.image}`;
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;
      });
    });
  });
  