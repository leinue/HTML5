<?php

function deleteModel($file){
	$result = @unlink ($file);
	return $result;
}

$file=$_GET['file'];

if(deleteModel($file)){
	echo 'true';
}else{
	echo 'false';
}

?>