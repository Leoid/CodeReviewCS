<?php

//OWASP/index.php/PHP_Object_Injection

class Example2
{
  private $hook;
  function __construct(){
      // some PHP code...
  }
  function __wakeup(){
      if (isset($this->hook)) eval($this->hook);
      // could be eval or a SQL statment...
  }
}

// USER CONTROLS THIS!!!!!!!
$user_data = unserialize($_COOKIE['data']);









