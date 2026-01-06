<?php
header("Content-Type: application/json");

// 1. API Credentials
$client_id = "dfc55f27-bc9b-4996-846a-68960eeb23ff";
$client_secret = "HN7xN6TnNRJOBezOmemyAXh9vq3ANeQCkd2rQ2f4";

// 2. Get Form Data from JS
$input = json_decode(file_get_contents('php://input'), true);
$datetime = $input['dob'] . 'T' . $input['tob'] . ':00+05:30';
$coordinates = "28.6139,77.2090";

// 3. Get Access Token (Server-to-Server)
$ch = curl_init("https://api.prokerala.com/token");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'grant_type' => 'client_credentials',
    'client_id' => $client_id,
    'client_secret' => $client_secret
]));
$token_res = json_decode(curl_exec($ch), true);
$access_token = $token_res['access_token'];

// 4. Fetch the Chart SVG
$chart_url = "https://api.prokerala.com/v2/astrology/chart?ayanamsa=1&coordinates=$coordinates&datetime=$datetime&chart_type=rasi&chart_style=north-indian";
curl_setopt($ch, CURLOPT_URL, $chart_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $access_token", "Accept: image/svg+xml"]);
curl_setopt($ch, CURLOPT_POST, false);
$svg_chart = curl_exec($ch);

// 5. Send results back to your HTML
echo json_encode([
    "chart_svg" => $svg_chart,
    "name" => $input['name']
]);
curl_close($ch);
?>
