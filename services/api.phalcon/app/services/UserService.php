<?php

class UserService
{
    const STATUS_DISABLE = 0;
    const STATUS_ACTIVE = 1;

    public static function validate($username, $password)
    {
        return \User::findFirst([
            'columns' => '*',
            'conditions' => 'username = ?0 AND password = ?1',
            'bind' => [$username, $password],
        ]);
    }

    public static function generatePayload($user)
    {
        return array(
            'id' => $user->id,
            'username' => $user->username,
            'scopes' => json_decode($user->scopes, true)
        );
    }

    public static function create($userInfo)
    {
        $user = new User();
        $userInfo['created_at'] = time();
        $userInfo['last_login'] = time();
        $userInfo['status'] = static::STATUS_ACTIVE;
        $userInfo['scopes'] = json_encode([]);

        $success = $user->save($userInfo, array('username', 'email', 'password', 'created_at', 'last_login'));

        if ($success) {
            echo "Thanks for registering!";
        } else {
            echo "Sorry, the following problems were generated: ";
            foreach ($user->getMessages() as $message) {
                echo $message->getMessage(), "<br/>";
            }
        }
    }
}