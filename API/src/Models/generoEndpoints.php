<?php

    function crear_genero(String $nombre){
        $sql = "INSERT INTO generos (nombre) VALUES ('". $nombre ."')";
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        $result = $conexion->exec($sql);
        $conn->disconnect();
        return 200;
    }

    function actualizar_genero(int $id, String $nombre){
        $sql = "UPDATE generos SET nombre = '".$nombre."' WHERE id = ".$id;
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        $result = $conexion->exec($sql);
        $conn->disconnect();
        if ($result > 0){
            return 200;
        }else{
            return 404;
        }
    }

    function eliminar_genero(int $id){
        try{
            $sql = "DELETE FROM generos WHERE id = ".$id;
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
        } catch (PDOException $e) {
            return 400;
        }
    }

    function todos_los_generos(){
        $sql = "SELECT * FROM generos";
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        $result = $conexion->query($sql);
        $result = $result->fetchAll(PDO::FETCH_OBJ);
        $conn->disconnect();
        return $result;
    }

?>