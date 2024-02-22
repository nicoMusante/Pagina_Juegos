<?php
    require"src\Models\Db.php";

    function crear_plataforma(String $nombre){
        $sql = "INSERT INTO plataformas (nombre) VALUES ('". $nombre ."')";
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        $result = $conexion->exec($sql);
        $conn->disconnect();
        return 200;
    }

    function actualizar_plataforma(int $id, String $nombre){
        $sql = "UPDATE plataformas SET nombre = '".$nombre."' WHERE id = ".$id;
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

    function eliminar_plataforma(int $id){
        try {
            $sql = "DELETE FROM plataformas WHERE id = ".$id;
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
    
    function todas_las_plataformas(){
        $sql = "SELECT * FROM plataformas";
        $conn = new Db();
        $conn->connect();
        $conexion = $conn->getConnection();
        $result = $conexion->query($sql);
        $result = $result->fetchAll(PDO::FETCH_OBJ);
        $conn->disconnect();
        return $result;
    }

    

?>