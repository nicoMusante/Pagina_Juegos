<?php

class Db {
    private $conn;
    private String $servername;
    private String $port;
    private String $username;
    private String $password;
    private String $dbname;
    
    
    public function __construct() {
        $this->servername = '127.0.0.1';
        $this->port = '8081';
        $this->username = 'root';
        $this->password = '';
        $this->dbname = 'juegos';
    }

    public function connect(){
        try {
            $dsn = "mysql:host=$this->servername;port=$this->port;dbname=$this->dbname;charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Error de conexión: ' . $e->getMessage());
        }
    }
    
    public function getConnection() {
        return $this->conn;
    }

    public function disconnect(){
        $this->conn = null;
    }
}

?>