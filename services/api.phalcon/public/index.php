<?php

error_reporting(E_ALL);

$debug = new Phalcon\Debug();
$debug->listen();

use Phalcon\Mvc\Application;
use Phalcon\Config\Adapter\Ini as ConfigIni;

try {
    define('APP_PATH', realpath('..') . '/');

    $config = new ConfigIni(APP_PATH . 'app/config/config.ini');

    require APP_PATH . 'app/config/utils.php';
    require APP_PATH . 'app/config/loader.php';
    require APP_PATH . 'app/config/services.php';
    require APP_PATH . $config->application->vendorDir . '/autoload.php';

    $application = new Application($di);
    $application->useImplicitView(false);
    echo $application->handle()->getContent();

} catch (Exception $e){
    echo $e->getMessage();
}
