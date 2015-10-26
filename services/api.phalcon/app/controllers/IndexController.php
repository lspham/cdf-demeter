<?php

class IndexController extends BaseController
{
    public function indexAction()
    {
        $payload = $this->auth();
        $this->json($payload);
    }

    public function generateAction()
    {

    }
}