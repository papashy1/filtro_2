const URL = "http://localhost:3000"
const headers = new Headers({ 'Content-Type': 'application/json' });
import { seleccionar_clima} from "./clima.js"


///////////////////////////  DEPARTAMENTOS  //////////////////////////

export function mostrar_departamento(data) {
    let m_r = document.querySelector("#tablita_r");
    m_r.innerHTML = "";
    data.forEach((departamento) => {
        let mostrar = document.createElement("tr");
        mostrar.setAttribute("class", "tr");
        mostrar.innerHTML = `
        <td>${departamento.id}</td>
        <td>${departamento.nomDepartamento}</td>
        <td>
        <button type="button" class="btn btn-primary border-0 rounded px-2" data-action="ver" id="${departamento.id}">Ver ciudades en el departamento</button>
        </td>
        <td>        
            <button  type="button" class="btn btn-info border-0 rounded fw-bold px-2" data-bs-toggle="modal" data-bs-target="#modal_r" id="${departamento.id}">Renombrar</button>
            <button  type="button" class="btn btn-danger border-0 rounded px-2" data-action="elim" id="${departamento.id}">Eliminar</button>
        </td>
        `;
        m_r.appendChild(mostrar);
    });
}

export async function get_departamento() {
    try {
        let data = await (await fetch(`${URL}/Departamentos`)).json();
        mostrar_departamento(data);
    }
    catch (error) {
        console.log(error)
    }
}

export async function post_departamento(data) {
    try {
        let config = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }

        let departamentos = await (await fetch(`${URL}/Departamentos`, config)).json();

    }
    catch (error) {
        console.log(error)
    }
}

export async function delete_departamento(id) {
    try {
        let config = {
            method: 'DELETE'
        };
        let del_d = await (await fetch(`${URL}/Departamentos/${id}`, config)).json();
    }
    catch (error) {
        console.log(error)
    }
}

export async function renombrar_departamento(data, id) {
    try {
        let config = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }
        let renombrar = await (await fetch(`${URL}/Departamentos/${id}`, config)).json();
    }
    catch (error) {
        console.log(error)
    }

}

///////////////////////////  CIUDADES //////////////////////////


function mostrar_ciudad(data) {
    let quitar = document.querySelector("#quitar");
    let quitar1 = document.querySelector("#quitar1");
    quitar.classList.remove("d-none");
    quitar1.classList.remove("d-none");
    let m_r = document.querySelector("#tablita_p");

    m_r.innerHTML = "";

    data.forEach(async(ciudad) => {
        console.log(ciudad);
        const clima_data = await seleccionar_clima(ciudad.nomCiudad);
        console.log(clima_data.data_clima);
        console.log(clima_data.icon);
        console.log(clima_data.description);
        console.log(clima_data.humidity);
        console.log(clima_data.temperatura);
        let mostrar = document.createElement("tr");
        mostrar.setAttribute("class", "tr");
        mostrar.setAttribute("id", `${ciudad.id}`);
        mostrar.innerHTML = `
        <td>${ciudad.id}</td>
        <td>${ciudad.nomCiudad}</td>
        <td>
            <img src="https://openweathermap.org/img/wn/${clima_data.icon}@2x.png" class="height="60px" width="60px"">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${clima_data.description}</li>
                <li class="list-group-item">Humedad: ${clima_data.humidity} %💧</li>
                <li class="list-group-item">Temperatura: ${clima_data.temperatura} c°🌡</li>
            </ul>
        </td>
        <td><img src="${ciudad.Imagen}" height="150px" width="100px" class="countainer d-flex justify-content-center align-items-center mt-3 p-1"></td>
        <td>        
            <button  type="button" class="btn btn-info border-0 rounded fw-bold px-2" data-bs-toggle="modal" data-bs-target="#modal_p" id="${ciudad.id}">Editar</button>
            <button  type="button" class="btn btn-danger border-0 rounded px-2" data-action="elim" id="${ciudad.id}">Eliminar</button>
        </td>
        `;
        m_r.appendChild(mostrar);

    });
}

export async function get_ciudad(id) {
    try {
        const depart_id = await fetch(`${URL}/Ciudades?departamentoId=${id}`);
        const depart = await depart_id.json();
        console.log(depart)
        await mostrar_ciudad(depart);
    } catch (error) {
        console.log(error)
    }
}

export async function post_ciudad(data) {
    try {
        let config = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        let ciudades = await (await fetch(`${URL}/Ciudades`, config)).json();
    }
    catch (error) {
        console.log(error)
    }
}

export async function delete_hijos(id) {

    try {
        const response = await fetch(`${URL}/Ciudades?departamentoId=${id}`);
        const result = await response.json();

        result.forEach(e => {
            delete_ciudad(e.id)
        });
    }
    catch (error) {
        console.log(error)
    }
}

export async function delete_ciudad(id) {
    try {
        let config = {
            method: 'DELETE',
        };
        let del_c = await (await fetch(`${URL}/Ciudades/${id}`, config)).json();
    }
    catch (error) {
        console.log(error)
    }
}

export async function editar_ciudad(data, id) {
    try {
        let config = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }
        let editar = await (await fetch(`${URL}/Ciudades/${id}`, config)).json();
    }
    catch (error) {
        console.log(error)
    }

}