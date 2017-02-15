<?php
$fp = fopen('js/json.json', 'w');
fwrite($fp, "var web=".json_encode($_POST['data']));
fclose($fp);
?>