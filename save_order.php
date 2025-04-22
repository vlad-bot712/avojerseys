<?php
// Activează CORS pentru a permite accesul din alte domenii
header("Access-Control-Allow-Origin: *"); // Permite toate originile (pentru testare)
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Permite metodele POST și OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permite anteturile necesare

// Activează afișarea erorilor pentru debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurare baza de date
$servername = "sql303.infinityfree.com"; // Înlocuiește cu serverul tău
$username = "if0_38802270"; // Înlocuiește cu numele utilizatorului tău
$password = "c08zhctji3vlQU"; // Înlocuiește cu parola ta
$dbname = "if0_38802270_magazin"; // Înlocuiește cu numele bazei de date

// Conectare la baza de date
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifică conexiunea
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexiunea la baza de date a eșuat: " . $conn->connect_error]));
}

// Verifică dacă cererea este de tip POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Preia datele trimise prin POST
    $email = $_POST['email'] ?? null;
    $address = $_POST['address'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $county = $_POST['county'] ?? null;
    $street = $_POST['street'] ?? null;
    $city = $_POST['city'] ?? null;
    $delivery_method = $_POST['deliveryMethod'] ?? null;
    $total_cost = $_POST['totalCost'] ?? null;
    $items = $_POST['items'] ?? null;

    // Validare câmpuri obligatorii
    if (!$email || !$address || !$phone || !$county || !$street || !$city || !$delivery_method || !$total_cost || !$items) {
        die(json_encode(["success" => false, "message" => "Toate câmpurile sunt obligatorii!"]));
    }

    // Conversie JSON pentru câmpul `items` dacă este un array
    if (is_array($items)) {
        $items = json_encode($items);
    }

    // Creează interogarea SQL
    $sql = "INSERT INTO orders (email, address, phone, county, street, city, delivery_method, total_cost, items)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Eroare la pregătirea interogării: " . $conn->error]));
    }

    // Leagă parametrii și execută interogarea
    $stmt->bind_param("ssssssdss", $email, $address, $phone, $county, $street, $city, $delivery_method, $total_cost, $items);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Comanda a fost salvată cu succes!"]);
    } else {
        die(json_encode(["success" => false, "message" => "Eroare SQL: " . $stmt->error]));
    }

    $stmt->close();
} else {
    // Pentru cereri care nu sunt de tip POST
    die(json_encode(["success" => false, "message" => "Acest fișier trebuie accesat printr-o cerere POST."]));
}

$conn->close();