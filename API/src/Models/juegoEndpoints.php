<?php

    function crear_juego($nombre, $imagen, $tipo_img, $descripcion, $url, $id_genero, $id_plataforma){
        $sql = "INSERT INTO juegos (nombre, imagen, tipo_imagen, descripcion, url, id_genero, id_plataforma) VALUES ('". $nombre ."', '".$imagen."', '".$tipo_img."', '".$descripcion."', '".$url."', '".$id_genero."', '".$id_plataforma."')";
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        if (!empty($nombre) && !empty($imagen) && !empty($tipo_img) && !empty($id_genero) && !empty($id_plataforma)){
            if ($tipo_img == "image/jpg" or $tipo_img == "image/jpeg" or $tipo_img == "image/png"){
                if (strlen($descripcion)<256){
                    if (strlen($url)<81){
                        $sql_plataformas = "SELECT * FROM plataformas WHERE id = ".$id_plataforma;
                        $plataformas_id = $conexion->query($sql_plataformas);
                        if ($plataformas_id->rowCount() > 0) {
                            $sql_generos = "SELECT * FROM generos WHERE id = ".$id_genero;
                            $generos_id = $conexion->query($sql_generos);
                            if ($generos_id->rowCount() > 0){
                                $result = $conexion->exec($sql);
                                $conn->disconnect();
                                return "correcto";
                            }else{
                                $conn->disconnect();
                                return "genero no encontrado";
                            }
                        }else{
                            $conn-> disconnect();
                            return "plataforma no encontrada";
                        }
                    }else{
                        $conn->disconnect();
                        return "url larga";
                    }
                }else{
                    $conn->disconnect();
                    return "descripcion larga";
                }
            }else{
                $conn->disconnect();
                return "error tipo_img";
            }
        }
        $conn->disconnect();
        return "campos vacios";
    }

    function actualizar_juego($id, $nombre, $imagen, $tipo_img, $descripcion, $url, $id_genero, $id_plataforma){
        $sql = "UPDATE juegos SET";
        $sets = array();

        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();

    
        if (!empty($nombre)) {
            $sets[] = "nombre = '".$nombre."'";
        }
    
        if (!empty($tipo_img) && !empty($imagen)) {
            if ($tipo_img == "image/jpg" or $tipo_img == "image/jpeg" or $tipo_img == "image/png"){
                $sets[] = "tipo_imagen = '".$tipo_img."'";
                $sets[] = "imagen = '".$imagen."'";
            }else{
                $conn->disconnect();
                return "error tipo_img";
            }
        }
    
        if (!empty($descripcion)) {
            if (strlen($descripcion)<256){
                $sets[] = "descripcion = '".$descripcion."'";
            }else{
                $conn->disconnect();
                return "descripcion larga";
            }
        }
    
        if (!empty($url)) {
            if (strlen($url)<81){
                $sets[] = "url = '".$url."'";
            }else{
                $conn->disconnect();
                return "url larga";
            }
        }
    
        if (!empty($id_genero)) {
            $sql_generos = "SELECT * FROM generos WHERE id = ".$id_genero;
            $generos_id = $conexion->query($sql_generos);
            if ($generos_id->rowCount() > 0){
                $sets[] = "id_genero = '".$id_genero."'";
            }else{
                $conn->diconnect();
                return "genero no encontrado";
            }
        }
    
        if (!empty($id_plataforma)) {
            $sql_plataformas = "SELECT * FROM plataformas WHERE id = ".$id_plataforma;
            $plataformas_id = $conexion->query($sql_plataformas);
            if ($plataformas_id->rowCount() > 0) {
                $sets[] = "id_plataforma = '".$id_plataforma."'";
            }else{
                $conn-> disconnect();
                return "plataforma no encontrada";
            }
        }
    
        if (!empty($sets)) {
            $sql .= " " . implode(", ", $sets);
            $sql .= " WHERE id = ".$id;
            $id_valido = $conexion->exec($sql);
            $conn->disconnect();
            if ($id_valido > 0){
                return "correcto";
            }else{
                return"id_incorrecto";
            }
        }else{
            $conn->diconnect();
            return "sin valores";
        }
    }

    function eliminar_juego(int $id){
        $sql = "DELETE FROM juegos WHERE id = ".$id;
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        $result = $conexion->exec($sql);
        $conn->disconnect();
        if ($result > 0) {
            return 200;
        } else {
            return 404;
        }
    }

    function todos_los_juegos($nombre, $plataforma, $genero, $orden){
        $filtro = "";
        $ordenar = " ORDER BY nombre ";
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        if (!empty($nombre)){
            $sql_nombre = "SELECT * FROM juegos WHERE nombre LIKE '%".$nombre."%'";
            $nombres = $conexion->query($sql_nombre);
            if ($nombres->rowCount() == 0){
                $conn->disconnect();
                return "nombre no encontrado";
            }else{
                $filtro .= "AND nombre LIKE '%".$nombre."%'";
            }
        }
        if (!empty($plataforma)){
            $sql_plataformas = "SELECT * FROM plataformas WHERE id = '".$plataforma."'";
            $plataformas = $conexion->query($sql_plataformas);
            if ($plataformas->rowCount() == 0){
                $conn->disconnect();
                return "plataforma no encontrada";
            }else{
                $filtro .= " AND id_plataforma = '".$plataforma."'";
            }
        }
        if (!empty($genero)){
            $sql_generos = "SELECT * FROM generos WHERE id = '".$genero."'";
            $generos = $conexion->query($sql_generos);
            if ($generos->rowCount() == 0){
                $conn->disconnect();
                return "genero no encontrado";
            }else{
                $filtro .= " AND id_genero = '".$genero."'";
            }
        }
        if (!empty($orden)){
            if ($orden != "ASC" && $orden != "DESC"){
                $conn->disconnect();
                return "orden invalido";
            }else{
                $ordenar .= $orden;
            }
        }
        $sql = "SELECT * FROM juegos WHERE 1 $filtro $ordenar";
        $result = $conexion->query($sql);
        $result = $result->fetchAll(PDO::FETCH_OBJ);
        $conn->disconnect();
        return $result;
    }
?>