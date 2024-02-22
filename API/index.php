<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Middleware\BodyParsingMiddleware;
use Slim\Factory\AppFactory;


require __DIR__ . '/vendor/autoload.php';
require"src\Models\plataformaEndpoints.php";
require"src\Models\juegoEndpoints.php";
require"src\Models\generoEndpoints.php";


$app = AppFactory::create();

// Permitir solicitudes desde un dominio específico (en este caso, http://localhost:3000)
header('Access-Control-Allow-Origin: http://localhost:3000');

// Permitir los métodos HTTP que deseas permitir (por ejemplo, GET, POST, OPTIONS)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

// Permitir los encabezados que deseas permitir (por ejemplo, Content-Type)
header('Access-Control-Allow-Headers: Content-Type');

// Verificar si la solicitud es de tipo OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // Finalizar la respuesta para las solicitudes OPTIONS sin realizar ninguna acción adicional
  exit;
}


$app->addBodyParsingMiddleware();


$app->post('/generos', function(Request $request, Response $response, $args){
    $body = $request->getParsedBody();
    if (empty($body['nombre'])){
        $response->withStatus(400);
        $response->getBody()->write('No se ha ingresado ningun nombre');
    } else {
        $nombre = $body['nombre'];
        $response = $response->withStatus(crear_genero($nombre));
        $response->getBody()->write("Se agrego correctamente");
    }
    return $response;
});

$app->put('/generos', function(Request $request, Response $response, $args){
    $body = $request->getParsedBody();
    $parametros = $request->getQueryParams();
    if (!empty($parametros['id']) && !empty($body['nombre'])){
        $id = $parametros['id'];
        $nombre = $body['nombre'];
        $response = $response->withStatus(actualizar_genero($id, $nombre));
        if ($response->getStatusCode() == 200){
            $response->getBody()->write("Se actualizo correctamente");
        }else{
            $response->getBody()->write("El id no se encuentra cargado");
        }
    }else{
        $response->getBody()->write('Debe ingresar todos los datos');
    }
    return $response;
});

$app->delete('/generos', function(Request $request, Response $response, $args){
    $parametros = $request->getQueryParams();
    if (empty($parametros['id'])){
        $response = $response->withStatus(400);
        $response->getBody()->write("Debe ingresar un id");
    }else{
        $id = $parametros['id'];
        $response = $response->withStatus(eliminar_genero($id));
        if ($response->getStatusCode() == 200){
            $response->getBody()->write("Se elimino correctamente");
        }else if ($response->getStatusCode() == 404){
            $response->getBody()->write("El id no se encuentra cargado");
        }else if ($response->getStatusCode() == 400){
            $response->getBody()->write("No puede eliminarse por dependencias de la base de datos");
        }
    }
    return $response;
});

$app->get('/generos', function(Request $request, Response $response, $args){
    $generos = todos_los_generos();
    if (!empty($generos)){
        $resoponseBody = json_encode($generos);
        $response->getBody()->write($resoponseBody);
    }else{
        $response->getBody()->write("No hay generos cargados");
    }
    return $response;
});

$app->post('/plataformas', function(Request $request, Response $response, $args){
    $body = $request->getParsedBody();
    if (empty($body['nombre'])){
        $response->withStatus(400);
        $response->getBody()->write('No se ha ingresado ningun nombre');
    } else {
        $nombre = $body['nombre'];
        $response = $response->withStatus(crear_plataforma($nombre));
        $response->getBody()->write("Se agrego correctamente");
    }
    return $response;
});

$app->put('/plataformas', function(Request $request, Response $response, $args){
    $body = $request->getParsedBody();
    $parametros = $request->getQueryParams();
    if (!empty($parametros['id']) && !empty($body['nombre'])){
        $id = $parametros['id'];
        $nombre = $body['nombre'];
        $response = $response->withStatus(actualizar_plataforma($id, $nombre));
        if ($response->getStatusCode() == 200){
            $response->getBody()->write("Se actualizo correctamente");
        }else{
            $response->getBody()->write("El id no se encuentra cargado");
        }
    }else{
        $response->getBody()->write('Debe ingresar todos los datos');
    }
    return $response;
});


$app->delete('/plataformas', function(Request $request, Response $response, $args){
    $parametros = $request->getQueryParams();
    if (empty($parametros['id'])){
        $response = $response->withStatus(400);
        $response->getBody()->write("Debe ingresar un id");
    }else{
        $id = $parametros['id'];
        $response = $response->withStatus(eliminar_plataforma($id));
        if ($response->getStatusCode() == 200){
            $response->getBody()->write("Se elimino correctamente");
        }else if ($response->getStatusCode() == 404){
            $response->getBody()->write("El id no se encuentra cargado");
        }else if ($response->getStatusCode() == 400){
            $response->getBody()->write("No puede eliminarse por dependencias de la base de datos");
        }
    }
    return $response;
});

$app->get('/plataformas', function(Request $request, Response $response, $args){
    $plataformas = todas_las_plataformas();
    if (!empty($plataformas)){
        $resoponseBody = json_encode($plataformas);
        $response->getBody()->write($resoponseBody);
    }else{
        $response->getBody()->write("No hay plataformas cargadas");
    }
    return $response;
});

$app->post('/juegos', function(Request $request, Response $response, $args){
    $parametros = $request->getParsedBody();
    $nombre = $parametros['nombre'];
    $imagen = $parametros['imagen'];
    $tipo_img = $parametros['tipo_img'];
    $descripcion = $parametros['descripcion'];
    $url = $parametros['url'];
    $id_genero = $parametros['id_genero'];
    $id_plataforma = $parametros['id_plataforma'];

    $result = crear_juego($nombre, $imagen, $tipo_img, $descripcion, $url, $id_genero, $id_plataforma);

    if ($result == "correcto"){
        $response = $response->withStatus(200);
        $response->getBody()->write("Se ha agregado correctamente");
    }
    if ($result == "genero no encontrado"){
        $response = $response->withStatus(404);
        $response->getBody()->write("El genero ingresado no se encuentra cargado");
    }
    if ($result == "plataforma no encontrada"){
        $response = $response->withStatus(404);
        $response->getBody()->write("La plataforma ingresada no se encuentra cargada");
    }
    if ($result == "url larga"){
        $response = $response->withStatus(400);
        $response->getBody()->write("La url excede el numero maximo de caracteres");
    }
    if ($result == "descripcion larga"){
        $response = $response->withStatus(400);
        $response->getBody()->write("La descripcion excede el numero maximo de caracteres");
    }
    if ($result == "error tipo_img"){
        $response = $response->withStatus(400);
        $response->getBody()->write("El tipo de imagen ingresado no es compatible");
    }
    if ($result == "campos vacios"){
        $response = $response->withStatus(400);
        $response->getBody()->write("Debe ingresar todos los campos obligatorios");
    }

    return $response;
});


$app->put('/juegos', function(Request $request, Response $response, $args){
  try {
    $body = $request->getParsedBody();
    $parametros = $request->getQueryParams();
    $id = $parametros['id'];
    if (empty($body['nombre'])){
        $nombre = null;
    }else{
        $nombre = $body['nombre'];
    }
    if (empty($body['imagen'])){
        $imagen = null;
    }else{
        $imagen = $body['imagen'];
    }
    if (empty($body['tipo_img'])){
        $tipo_img = null;
    }else{
        $tipo_img = $body['tipo_img'];
    }
    if (empty($body['descripcion'])){
        $descripcion = null;
    }else{
        $descripcion = $body['descripcion'];
    }
    if (empty($body['url'])){
        $url = null;
    }else{
        $url = $body['url'];
    }
    if (empty($body['id_genero'])){
        $id_genero = null;
    }else{
        $id_genero = $body['id_genero'];
    }
    if (empty($body['id_plataforma'])){
        $id_plataforma = null;
    }else{
        $id_plataforma = $body['id_plataforma'];
    }

    if (empty($body['id'])){
        $response = $response->withStatus(400);
        $response->getBody()->write("Debe ingresar un id");
    }else{
        $result = actualizar_juego($id, $nombre, $imagen, $tipo_img, $descripcion, $url, $id_genero, $id_plataforma);
        if ($result == "correcto"){
            $response = $response->withStatus(200);
            $response->getBody()->write("Se ha actualizado correctamente");
        }
    }
} catch(Exception $e) {
    $response = $response->withStatus(400);
    $response->getBody()->write($e->getMessage());
}
    
        if($result == "error tipo_img"){
            $response = $response->withStatus(400);
            $response->getBody()->write("El tipo de imagen ingresado no es compatible");
        }
        if ($result == "descripcion larga"){
            $response = $response->withStatus(400);
            $response->getBody()->write("La descripcion excede el numero maximo de caracteres");
        }
        if ($result == "url larga"){
            $response = $response->withStatus(400);
            $response->getBody()->write("La url excede el numero maximo de caracteres");
        }
        if ($result == "genero no encontrado"){
            $response = $response->withStatus(404);
            $response->getBody()->write("El genero ingresado no se encuentra cargado");
        }
        if ($result == "plataforma no encontrada"){
            $response = $response->withStatus(404);
            $response->getBody()->write("La plataforma ingresada no se encuentra cargada");
        }
        if ($result == "id_incorrecto"){
            $response = $response->withStatus(404);
            $response->getBody()->write("El id ingresado no se encuentra cargado");
        }
        if ($result == "sin valores"){
            $response = $response->withStatus(200);
            $response->getBody()->write("No se ha ingresado valores");
        }

    }
);

$app->delete('/juegos', function(Request $request, Response $response, $args){
    $parametros = $request->getQueryParams();
    if (empty($parametros['id'])){
        $response = $response->withStatus(400);
        $response->getBody()->write("Debe ingresar un id");
    }else{
        $id = $parametros['id'];
        $response = $response->withStatus(eliminar_juego($id));
        if ($response->getStatusCode() == 200){
            $response->getBody()->write("Se elimino correctamente");
        }else{
            $response->getBody()->write("El id no se encuentra cargado");
        }
    }
    return $response;
});

$app->get('/juegos', function(Request $request, Response $response, $args){
    $body = $request->getQueryParams();
    if (!empty($body['nombre'])){
        $nombre = $body['nombre'];
    }else{
        $nombre = "";
    }
    if (!empty($body['plataforma'])){
        $plataforma =  $body['plataforma'];
    }else{
        $plataforma = "";
    }
    if (!empty($body['genero'])){
        $genero = $body['genero'];
    }else{
        $genero = "";
    }
    if (!empty($body['orden'])){
        $orden = $body['orden'];
    }else{
        $orden = "";
    }
    $result = todos_los_juegos($nombre, $plataforma, $genero, $orden);
    if (!empty($result)){
        if ($result == "nombre no encontrado"){
            $response = $response->withStatus(404);
        }
        if ($result == "plataforma no encontrada"){
            $response = $response->withStatus(404);
        }
        if ($result == "genero no encontrado"){
            $response = $response->withStatus(404);
        }
        if ($result == "orden invalido"){
            $response = $response->withStatus(400);
        }
        $response = $response->withStatus(200);
        $responseBody = json_encode($result);
        $response->getBody()->write($responseBody);
    }else{
        $response->getBody()->write("No se ha encontrado juegos");
    }
    return $response;
});

$app->run();

?>