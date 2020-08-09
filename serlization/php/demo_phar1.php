<?php
    class Class1{
    }

    $phar = new Phar("test.phar");
    $phar->startBuffering();
    $phar->setStub("<?php __HALT_COMPILER(); ?>");

    // Create a Class1 object
    $c1 = new Class1();
    $phar->addFile("file.txt","anything");
    $phar->setMetadata($c1); //Passing the Class1 object to the metadata section of the phar object
    $phar->stopBuffering();
?>
