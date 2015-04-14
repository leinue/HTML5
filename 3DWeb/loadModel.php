<?php 
        function listDir($dir){
            if(is_dir($dir)){
                if ($dh = opendir($dir)) {
                    while (($file = readdir($dh)) !== false){
                        if((is_dir($dir."/".$file)) && $file!="." && $file!=".."){
                            echo "<li id=\"\">model/$file<li>";
                            listDir($dir."/".$file."/");
                        }
                        else{
                            if($file!="." && $file!=".."){
                                $ext=explode(".",$file);
                                if($ext[count($ext)-1]!='x3d'){
                                    $id=$ext[0];
                                    echo "<li id=\"$id\"><img src=\"model/$file\"><li>";
                                    $id='';
                                }
                            }
                        }
                    }
                    closedir($dh);
                }
            }
        }
        //开始运行
        listDir("model");
?>