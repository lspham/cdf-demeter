<?php

use Phalcon\DI\FactoryDefault;
use Phalcon\Mvc\Dispatcher;

$di = new FactoryDefault();

$di->set('db', function() use ($config) {
    $dbclass = 'Phalcon\Db\Adapter\Pdo\\' . $config->database->adapter;
    return new $dbclass(array(
        "host"     => $config->database->host,
        "username" => $config->database->username,
        "password" => $config->database->password,
        "dbname"   => $config->database->name
    ));
});

$di->set('jwt', function() use ($config) {
    return new JWT(
        $config->jwt->privateKey,
        $config->jwt->publicKey,
        $config->jwt->passphrase
    );
});