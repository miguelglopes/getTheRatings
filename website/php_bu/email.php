<?php
// USER ATTACHMENT
$path_info = pathinfo(__FILE__);
$dir = $path_info['dirname'];
chdir($dir);
echo  $dir;
$uploaddir = $dir . "/";
$uploadfile = $uploaddir . basename($_FILES['fileToUpload']['name']);
$file = $_FILES['fileToUpload']['tmp_name'];

echo '<pre>';
if (move_uploaded_file($file, $uploadfile)) {
    echo "Arquivo válido e enviado com sucesso.\n";
} else {
    echo "Possível ataque de upload de arquivo!\n";
}

echo 'Aqui está mais informações de debug:';
print_r($_FILES);

print "</pre>";

//SCREENSHOT ATTACHMENT
//Get the base-64 string from data
$filteredData=substr($_POST['img_val'], strpos($_POST['img_val'], ",")+1);
$unencodedData=base64_decode($filteredData);
file_put_contents('screenshot.png', $unencodedData);

//LOGATTACHMENT
$dados=$_POST['dadoslog'];
$filelog = 'log.json';
file_put_contents($filelog, $dados);

//
// subject , body
//
$emailSubject = $_POST['subject']; // replace with your own
$messageBody = $_POST['message']; // replace with your own
//
// sender
//
$fromEmailAddress = 'migasll@bplaced.net'; // replace with your own
$fromEmailName = $_POST['name']; // replace with your own
$replyToEmailAddress = $_POST['email']; // replace with your own
$replyToEmailName = $_POST['name']; // replace with your own*/
//
// recipients (add more if you need)
//
$toEmailAddress1 = 'miguelll1991@gmail.com'; // replace with your own
$toEmailName1 = 'Miguel Lopes'; // replace with your own
$toEmailFull1 = $toEmailName1 . ' <'. $toEmailAddress1 .'>';
//
// attachment 1
$attachmentShortFileName1 = $_FILES['fileToUpload']['name']; // replace with your own
$attachmentFileName1 = $dir. "/".$attachmentShortFileName1;
$attachment1 = file_get_contents($attachmentFileName1);
$b64Attachment1 = chunk_split(base64_encode($attachment1));
$mimeType1 = $_FILES['fileToUpload']['type']; // replace with your own

//attachment2
$attachmentShortFileName2 = "screenshot.png"; // replace with your own
$attachmentFileName2 = $dir. "/". $attachmentShortFileName2 ;
$attachment2 = file_get_contents($attachmentFileName2);
$b64Attachment2 = chunk_split(base64_encode($attachment2));
$mimeType2 = "image/png"; // replace with your own

//attachment3
$attachmentShortFileName3 = $filelog; // replace with your own
$attachmentFileName3 = $dir. "/". $attachmentShortFileName3 ;
$attachment3 = file_get_contents($attachmentFileName3);
$b64Attachment3 = chunk_split(base64_encode($attachment3));
$mimeType3 = "application/json"; // replace with your own
 
//
// headers input
//
// comment out if not used
//
$headers = "From: " . $fromEmailName . " <" . $fromEmailAddress . ">" . "\r\n" ;
$headers.= "Reply-To: " . $replyToEmailName . " <" . $replyToEmailAddress . ">" . "\r\n" ;
//$headers.= "cc: " . $ccEmailName1 . " <" . $ccEmailAddress1 . ">" . "\r\n" ;
//$headers.= "cc: " . $ccEmailName2 . " <" . $ccEmailAddress2 . ">" . "\r\n" ;
//$headers.= "bcc: " . $bccEmailName1 . " <" . $bccEmailAddress1 . ">" . "\r\n" ;
//$headers.= "bcc: " . $bccEmailName2 . " <" . $bccEmailAddress2 . ">" . "\r\n" ;
 
// Generate a mime boundary string
$rnd_str = md5(time());
$mime_boundary = "==Multipart_Boundary_x{$rnd_str}x";
// Add headers for file attachment
$headers .= "MIME-Version: 1.0\n" .
 "Content-Type: multipart/mixed;\n" .
 " boundary=\"{$mime_boundary}\"";
// Add a multipart boundary above the plain message
$body = "This is a multi-part message in MIME format.\r\n\r\n" .
 "--{$mime_boundary}\r\n" .
 "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n" .
 "Content-Transfer-Encoding: 7bit\r\n\r\n" .
 $messageBody . "\r\n\r\n";
// Add first file attachment to the message
$body .= "--{$mime_boundary}\r\n" .
 "Content-Type: {$mimeType1};\r\n" .
 " name=\"{$attachmentShortFileName1}\"\r\n" .
 "Content-Disposition: attachment;\r\n" .
 " filename=\"{$attachmentShortFileName1}\"\r\n" .
 "Content-Transfer-Encoding: base64\r\n\r\n" .
 $b64Attachment1 . "\r\n\r\n" .
//
// comment out one of the two following lines
// dependent on number of attached files
// last mime boundary must end in "--"
//
 "--{$mime_boundary}\r\n";
 // "--{$mime_boundary}--\r\n";
//
// Add second file attachment to the message
$body .="Content-Type: {$mimeType2};\r\n" .
 " name=\"{$attachmentShortFileName2}\"\r\n" .
 "Content-Disposition: attachment;\r\n" .
 " filename=\"{$attachmentShortFileName2}\"\r\n" .
 "Content-Transfer-Encoding: base64\r\n\r\n" .
 $b64Attachment2 . "\r\n\r\n" .
//
// comment out one of the two following lines
// dependent on number of attached files
// last mime boundary must end in "--"
//
  "--{$mime_boundary}\r\n";
 //"--{$mime_boundary}--\r\n";
 
 // Add third file attachment to the message
$body .="Content-Type: {$mimeType3};\r\n" .
 " name=\"{$attachmentShortFileName3}\"\r\n" .
 "Content-Disposition: attachment;\r\n" .
 " filename=\"{$attachmentShortFileName3}\"\r\n" .
 "Content-Transfer-Encoding: base64\r\n\r\n" .
 $b64Attachment3 . "\r\n\r\n" .
//
// comment out one of the two following lines
// dependent on number of attached files
// last mime boundary must end in "--"
//
  //"--{$mime_boundary}\r\n";
 "--{$mime_boundary}--\r\n";
 
//eliminar ficheiro do server
unlink($attachmentFileName1);
unlink($attachmentFileName2);
 
$return = mail( $toEmailFull1 , $emailSubject, $body, $headers );
?>