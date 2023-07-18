

async function obtener_api(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw 'Error al obtener los datos';
  }
}

export async function seleccionar_clima(nombre) {
  try {
  let ciudad = nombre
  const api_ciudad = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=c0f9e9ee1eb24902bad51c1b4bfaf9c1`;
  console.log(ciudad);
  const altitudes = await obtener_api(api_ciudad)
  console.log(altitudes[0].lat);
  console.log(altitudes[0].lon);
  const api_full = `https://api.openweathermap.org/data/2.5/weather?lat=${altitudes[0].lat}&lon=${altitudes[0].lon}&appid=c0f9e9ee1eb24902bad51c1b4bfaf9c1&units=metric&lang=es`;

  const datos = await obtener_api(api_full)
  console.log(datos)

  return {
    data_clima: datos,
    icon: datos.weather[0].icon,
    description: datos.weather[0].description,
    humidity: datos.main.humidity,
    temperatura: datos.main.temp
  };
  }
  catch (error) {
    throw 'Error al obtener los datos del clima';
  }
}
