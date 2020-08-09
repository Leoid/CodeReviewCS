<?php

class Person{
    public $name;
    public $age;
}

$b1twis3 = new Person;

$b1twis3->name = 'Hamid';
$b1twis3->age = '30';

echo "\t".serialize($b1twis3);


?>
