<?php

class AuthController extends BaseController
{
    public function indexAction()
    {

    }

    public function loginAction($username, $password)
    {
        $user = UserService::validate($username, $password);

        if (!$user) {
            return $this->error(400, 'username or password is invalid');
        }

        $payload = UserService::generatePayload($user);
        $token = $this->jwt->generate($payload);

        $this->json(array('token' => $token));
    }

    public function registerAction()
    {
        $data = $this->request->getPost();

        UserService::create($data, array('name', 'email'));
    }
}

