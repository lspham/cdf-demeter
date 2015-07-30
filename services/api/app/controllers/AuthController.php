<?php

class AuthController extends BaseController
{
    public function indexAction()
    {

    }

    public function loginAction($username, $password)
    {
        $payload = array(
            'username' => $username
        );
        $token = $this->jwt->generate($payload);

        $this->json(array('token' => $token));
    }
}

