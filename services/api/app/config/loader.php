<?php
use \Phalcon\Loader;

$loader = new Loader();

$loader->registerDirs(
    array(
        APP_PATH . $config->application->controllersDir,
        APP_PATH . $config->application->modelsDir
    )
)->register();

