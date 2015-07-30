<?php

use Phalcon\Mvc\Controller;
use Phalcon\Http\Response;

class BaseController extends Controller
{
    protected function auth()
    {
        $token = $this->request->get('token');

        if ($token) {
            try {
                $payload = $this->jwt->validate($token);
                return $payload;
            } catch (Exception $e) {
                $this->error(401, "token not provided");
            }
        }
    }

    protected function json($data)
    {
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
}

