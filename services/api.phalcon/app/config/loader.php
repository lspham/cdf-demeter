<?php
use \Phalcon\Loader;

$loader = new Loader();

// $loader->registerNamespaces([
//     'Service' => APP_PATH . $config->application->servicesDir,
// ]);

$loader->registerDirs([
    APP_PATH . $config->application->controllersDir,
    APP_PATH . $config->application->modelsDir,
    APP_PATH . $config->application->servicesDir
])->register();
