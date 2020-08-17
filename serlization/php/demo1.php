<?php

class Person{
    public $name;
    public $age;
}

$b1twis3 = new Person;

$b1twis3->name = 'Hamid';
$b1twis3->age = '30';

$ser = serialize($b1twis3);
$uns = unserialize($ser);

echo $uns->name;



?>
