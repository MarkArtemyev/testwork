<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $products = explode("\n", file_get_contents('products.txt'));
    $newProducts = [];

    foreach ($products as $product) {
        if (!empty($product) && $product !== implode(' :: ', $input)) {
            $newProducts[] = $product;
        }
    }

    file_put_contents('products.txt', implode("\n", $newProducts));
}
?>
