<?php
if (file_exists('products.txt')) {
    $products = explode("\n", file_get_contents('products.txt'));
    $productsArray = [];
    foreach ($products as $product) {
        if (!empty($product)) {
            $productsArray[] = explode(' :: ', $product);
        }
    }
    echo json_encode($productsArray);
}
?>
