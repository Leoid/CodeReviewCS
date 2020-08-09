<?php

class Person{
    public $name;
    public $age;
}

$b1twis3 = new Person;

$b1twis3->name = 'Hamid';
$b1twis3->age = '30';
$b1twis3->role = 'customer';

$ser = serialize($b1twis3);


echo $ser;
$exp = 'O:6:"Person":3:{s:4:"name";s:5:"Hamid";s:3:"age";s:2:"30";s:4:"role";s:5:"admin";}';

$uns = unserialize($exp);


var_dump($uns);




?>
