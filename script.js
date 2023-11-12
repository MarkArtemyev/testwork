document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('add_product.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        loadProducts();
    });
});

function loadProducts() {
    fetch('get_products.php')
        .then(response => response.json())
        .then(data => {
            updateTable(data);
        });
}

function updateTable(products) {
    const tbody = document.getElementById('productsTable').querySelector('tbody');
    tbody.innerHTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;

    products.forEach(product => {
        const row = tbody.insertRow();
        row.setAttribute('title', product.join(' :: '));
        row.addEventListener('click', function() {
            deleteProduct(product);
        });

        product.forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });

        totalPrice += parseFloat(product[2]);
        totalQuantity += parseInt(product[3]);
    });

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    document.getElementById('totalQuantity').textContent = totalQuantity;
}

function deleteProduct(product) {
    fetch('delete_product.php', {
        method: 'POST',
        body: JSON.stringify(product)
    })
    .then(response => response.text())
    .then(data => {
        loadProducts();
    });
}

function sortTable(columnIndex) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("productsTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            if (columnIndex < 2) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

window.onload = function() {
    loadProducts();
};
