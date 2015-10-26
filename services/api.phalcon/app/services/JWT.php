<?php

use Namshi\JOSE\SimpleJWS;

class JWT
{
    private $_publicKey;
    private $_privateKey;

    public function __construct($privateKey, $publicKey, $passphrase)
    {
        $this->_publicKey = openssl_pkey_get_public(file_get_contents(APP_PATH . $publicKey));
        $this->_privateKey = openssl_pkey_get_private(file_get_contents(APP_PATH . $privateKey), $passphrase);
    }

    public function validate($token)
    {
        $jwt = SimpleJWS::load($token);

        if ($jwt->isValid($this->_publicKey, 'RS256')) {
            $payload = $jwt->getPayload();

            return $payload;
        }

        // TODO: check expire time
    }

    public function generate($payload)
    {
        $jws  = new SimpleJWS(array(
            'alg' => 'RS256'
        ));

        $jws->setPayload($payload);
        $jws->sign($this->_privateKey);

        return $jws->getTokenString();
    }
}