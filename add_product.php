<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $manufacturer = $_POST['manufacturer'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];

    $productString = "{$manufacturer} :: {$name} :: {$price} :: {$quantity}\n";
    file_put_contents('products.txt', $productString, FILE_APPEND);
}
?>
