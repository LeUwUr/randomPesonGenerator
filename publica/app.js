const boton = document.querySelector('#boton');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');

const edad = document.querySelector('#edad');
const nacionalidad = document.querySelector('#nacionalidad');
const ciudad = document.querySelector('#ciudad');
const estado = document.querySelector('#estado');
const pais = document.querySelector('#pais');


const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const foto = document.querySelector('#foto');
const latitud = document.querySelector('#latitud');
const longitud = document.querySelector('#longitud');

const initialCoordinates = { lat: 32.46189158211574, lng: -116.82442893896096 };
//initMap(initialCoordinates);

let map;
let marker;

const generarUsuario = async (numUsers = 1) => {
    //consultar a la API
    const url = `https://randomuser.me/api/?results=${numUsers}`;
    const respuesta = await fetch(url);
    const { results } = await respuesta.json();

    // Limpiar los usuarios existentes (si los hay)
    const contenedor = document.querySelector(".contenedor");
    contenedor.innerHTML = "";

    // Crear los elementos para el usuario
    results.forEach((datos) => {
        // Recorrer los resultados y crear elementos para cada usuario
        const userDiv = document.createElement("div");
        
        const userContainer = document.createElement('div');
        userContainer.className = 'user-container';
        const img = document.createElement("img");
        const name = document.createElement("h2");
        const email = document.createElement("p");
        const phone = document.createElement("p");
        const latitude = document.createElement("p");
        const longitude = document.createElement("p");
        const age = document.createElement("p");
        const nat = document.createElement("p");
        const city = document.createElement("p");
        const state = document.createElement("p");
        const country = document.createElement("p");

        // Establecer los atributos y contenido para los elementos
        img.src = datos.picture.medium;
        img.alt = "imagen";
        img.style.borderRadius = "50%";
        img.style.width = "100px";
        name.textContent = `Hola mi nombre es: ${datos.name.first} ${datos.name.last}`;
        email.textContent = `Correo: ${datos.email}`;
        phone.textContent = `Celular: ${datos.phone}`;
        age.textContent = `Edad: ${datos.dob.age}`;
        nat.textContent = `Nacionalidad: ${datos.nat}`;
        city.textContent = `Ciudad: ${datos.location.city}`;
        state.textContent = `Estado: ${datos.location.state}`;
        country.textContent = `Pais: ${datos.location.country}`;
        //coordenadas.textContent = `Coordenadas ${datos.location.coordinates.latitude} ${datos.location.coordinates.longitude}`;

       // Anexar los elementos al userDiv
        userDiv.appendChild(img);
        userDiv.appendChild(name);
        userDiv.appendChild(age);
        userDiv.appendChild(nat);
        userDiv.appendChild(city);
        userDiv.appendChild(state);
        userDiv.appendChild(country);
        userDiv.appendChild(email);
        userDiv.appendChild(phone);
        userDiv.appendChild(latitude); 
        userDiv.appendChild(longitude); 

        // Anexar el userDiv al contenedor
        contenedor.appendChild(userDiv);
        userContainer.appendChild(userDiv);
        
         // Anexar el userContainer al contenedor
        contenedor.appendChild(userContainer);

        const userMapDiv = document.createElement("div");
        userMapDiv.classList.add("user-map");
        userContainer.appendChild(userMapDiv);

        const coordenadas = {
            lat: parseFloat(datos.location.coordinates.latitude),
            lng: parseFloat(datos.location.coordinates.longitude),
        };

        latitude.textContent = `Latitud: ${coordenadas.lat}`;
        longitude.textContent = `Longitud: ${coordenadas.lng}`;

        //Crea un mapa para el usuario y actualiza el marcador con las nuevas coordenadas
        createUserMap(coordenadas, userMapDiv);

        //Actualizar el marcador con las nuevas coordenadas
        updateMarker(coordenadas)
    });
}

// Initialize and add the map
async function initMap(coordenadas) {
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: coordenadas,
    //   mapId: "USER_LOCATION",
    });
  
    // The marker, positioned at the user's coordinates
    marker = new google.maps.Marker({
      map: map,
      position: coordenadas,
      title: "user location",
    });
  }

function updateMarker(coordenadas){
    if (marker) {
        marker.setPosition(coordenadas);
        map.setCenter(coordenadas);
    }
}

function createUserMap(coordenadas, mapElement) {
    const map = new google.maps.Map(mapElement, {
      zoom: 5,
      center: coordenadas,
    });
  
    const marker = new google.maps.Marker({
      map: map,
      position: coordenadas,
      title: "User location",
    });
  
    return { map, marker };
  }

document.addEventListener('DOMContentLoaded', generarUsuario);
document.addEventListener('googleMapsApiLoaded', () => {
    initMap(initialCoordinates);
  });

const userCountInput = document.querySelector('#user-count');
boton.addEventListener('click', () => {
const userCount = parseInt(userCountInput.value, 15) || 1;
generarUsuario(userCount);
});
