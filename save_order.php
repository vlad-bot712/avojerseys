<?php
// În `save_order.php` la început:
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "sql303.infinityfree.com";
$username = "if0_38802270";
$password = "c08zhctji3vlQU";
$dbname = "if0_38802270_magazin";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexiunea a eșuat: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Afișează datele primite pentru debugging
    echo "Date primite de la client:\n";
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";

    $email = $_POST['email'] ?? null;
    $address = $_POST['address'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $county = $_POST['county'] ?? null;
    $street = $_POST['street'] ?? null;
    $city = $_POST['city'] ?? null;
    $delivery_method = $_POST['deliveryMethod'] ?? null;
    $total_cost = $_POST['totalCost'] ?? null;
    $items = $_POST['items'] ?? null;

    if (!$email || !$address || !$phone || !$county || !$street || !$city || !$delivery_method || !$total_cost || !$items) {
        die("Eroare: Toate câmpurile sunt obligatorii. Date primite: " . json_encode($_POST));
    }

    $sql = "INSERT INTO orders (email, address, phone, county, street, city, delivery_method, total_cost, items)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Eroare la pregătirea interogării: " . $conn->error);
    }

    $stmt->bind_param("ssssssdss", $email, $address, $phone, $county, $street, $city, $delivery_method, $total_cost, $items);

    if ($stmt->execute()) {
        echo "Comanda a fost salvată cu succes!";
    } else {
        die("Eroare SQL: " . $stmt->error);
    }

    $stmt->close();
} else {
    die("Eroare: Acest fișier trebuie accesat printr-o cerere POST.");
}

$conn->close();
?>
