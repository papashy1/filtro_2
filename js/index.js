import { get_departamento, post_departamento, delete_departamento, renombrar_departamento, get_ciudad, post_ciudad, delete_ciudad, editar_ciudad, delete_hijos} from "./funciones.js"

let temp = 0
let temp2 = 0

let form = document.querySelector('#form');
let form2 = document.querySelector('#form2');
let renombrar_d = document.querySelector('#renombrar_r');
let btn_agregar = document.querySelector('#btn_agregar');
let btn_agregar_c = document.querySelector('#btn_agregar_p');
let btn_agregar_l = document.querySelector('#btn_agregar_l');
let editar_c = document.querySelector('#editar_p');

btn_agregar.addEventListener("click", function () {
    let input_agregar = document.querySelector('#nueva_r').value;
    if (input_agregar == "") {
        alert("ERROR! debes escribir un nombre para agregar un Departamento")
    }
    else {
        let agregar = { nomDepartamento: input_agregar };
        post_departamento(agregar);
    }
});

form.addEventListener("click", pito => {
    let but = pito.target.closest("button")
    temp = parseInt(but.id)
    let solucion = but.dataset.action
    if (solucion == "elim") {
        delete_departamento(temp);
        delete_hijos(temp)
    }
    else if (solucion == "ver") {
        get_ciudad(temp);
    }
})

renombrar_d.addEventListener("click", function () {
    let input_renombrar = document.querySelector('#nuevo_nombre').value;
    if (input_renombrar == "") {
        alert("ERROR! debes escribir un nombre para renombrar un Departamento")
    }
    else {
        let renombrar = {
            id: temp,
            nomDepartamento: input_renombrar
        };
        renombrar_departamento(renombrar, temp);
    }
});

btn_agregar_c.addEventListener("click", function () {
    let input_agregar_c = document.querySelector('#nuevo_p').value;
    let input_agregar_img = document.querySelector('#nuevo_p1').value;
    if (input_agregar_c == "") {
        alert("ERROR! debes escribir un nombre para agregar una Ciudad")
    }
    else {
        let agregar_c = {
            nomCiudad: input_agregar_c,
            departamentoId: temp,
            Imagen: input_agregar_img
        };
        post_ciudad(agregar_c);
    }
});

editar_c.addEventListener("click", function () {
    let input_editar = document.querySelector('#editado_np').value;
    let input_editar_img = document.querySelector('#editado_img').value;
    if (input_editar == "") {
        alert("ERROR! debes escribir un nombre para editar una Ciudad")
    }
    else {
        let editar = {
            id: temp2,
            nomCiudad: input_editar,
            departamentoId: temp,
            Imagen: input_editar_img,
        };
        editar_ciudad(editar, temp2);
    }
});

form2.addEventListener("click", e => {
    let but = e.target.closest("button")
    let tr = e.target.closest("tr");
    temp2 = parseInt(tr.id);
    let no_me_gusto = but.dataset.action
    if (no_me_gusto == "elim") {
        delete_ciudad(temp2);
    }   
});

btn_agregar_l.addEventListener("click", function () {
    let letra = document.querySelector('#letra').value;
    console.log(letra);
    localStorage.setItem("tamaño", letra);
    tamaño();
});

function tamaño() {
    const letra = JSON.parse(localStorage.getItem("tamaño"))
    if (letra != null && letra != undefined) { 
        let letra_b = document.querySelector('#body_t')
        letra_b.setAttribute("class", `fs-${letra}`);
    }
}

get_departamento()
tamaño();
