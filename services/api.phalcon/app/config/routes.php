<?php

use Phalcon\Mvc\Router;

$router = new Router();

$router->add(
    '/:namespace/:controller',
    array(
        'namespace' => 1,
        'controller' => 2
    )
);

return $router;
