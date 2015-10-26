<?php

use Phalcon\Mvc\Controller;
use Phalcon\Http\Response;

class BaseController extends Controller
{
    protected $_s = null;

    protected function auth()
    {
        $token = $this->request->getHeader('Authorization');

        if ($token) {
            try {
                $this->_s = $this->jwt->validate($token);

                // TODO: validate user scopes
                // if ($scope) {
                //     if (!isset($this->_s[$scope['resource']]) {
                //         return $this->error(403, 'no permission');
                //     }
                // }

                return true;
            } catch (Exception $e) {
                return $this->error(401, 'token not valid');
            }
        } else {
            return $this->error(401, 'token not provided');
        }
    }

    protected function json($data, $params = null)
    {
        if ($params) {
            $data = array_intersect_key($data, array_flip($params));
        }

        $response = new Response();
        $response->setStatusCode(200, "OK");
        $response->setJsonContent($data);
        $response->send();
    }


    protected function error($errorCode, $msg = null)
    {
        $response = new Response();
        $response->setStatusCode($errorCode);

        if ($msg) {
            $response->setJsonContent(array('error' => $msg));
        }

        $response->send();
        exit;
    }

    protected function require($params)
    {
        $requests = $this->request->get();

        $data = [];
        foreach ($params as $param) {
            if (!isset($requests[$param])) {
                return $this->error(400, "required param '$param'");
            }

            $data[$param] = $requests[$param];
        }

        return $data;
    }
}

