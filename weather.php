<?php
header('Content-Type: application/json');
$cacheFile = 'cache.json';
$cacheTime = 3600; 

if (isset($_GET['city'])) {
    $city = urlencode($_GET['city']);
    $apiKey = '13fa17f14cb82cd7a5ddd7e24c60d053'; 
    $apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units=metric";

    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
        $data = json_decode(file_get_contents($cacheFile), true);
    } else {
        $response = file_get_contents($apiUrl);
        
        if ($response === false) {
            echo json_encode(['error' => 'Unable to fetch data from API']);
            exit;
        }

        $data = json_decode($response, true);

    
        if (isset($data['cod']) && $data['cod'] !== 200) {
            echo json_encode(['error' => $data['message']]);
            exit;
        }

        file_put_contents($cacheFile, $response);
    }

    echo json_encode($data);
} else {
    echo json_encode(['error' => 'No city provided']);
}
?>