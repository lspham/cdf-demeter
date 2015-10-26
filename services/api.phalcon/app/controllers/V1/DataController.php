<?php

namespace V1;

class DataController extends \BaseController
{
    public function onConstruct()
    {
        $this->auth();

        vl($this->_s);
    }

    public function indexAction()
    {
        $deviceId = $this->request->get('deviceId');

        $records = \Data::find(array(
            'condition' => "fk_device = $deviceId",
            'columns' => 'id, fk_sensor, data, created_at'
        ));

        $this->json($records);
    }
}