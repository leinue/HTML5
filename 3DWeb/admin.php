<!DOCTYPE html>
<html>
<head>
    <title>Virtual Museum Admin Panel</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
</head>
<body>

    <header>
        <nav>Virtual Musuem Administration Panel</nav>
    </header>

    <section>
        <div class="admin-menu">
            <ul>
                <li><span class="admin-menu-active">Manage Models</span></li>
                <li><span>Manage Background</span></li>
            </ul>
        </div>

        <div id="models-panel" class="operate-panel">
        <ul>
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
        </ul>
    </div>
    </section>
    
    <footer>
        <div>
            <p>Virtual Musuem Built by jQuery & X3DOM & CSS3</p>
        </div>
    </footer>
    <script type="text/javascript">
        $('a,h1,h2,h3,h4,h5,h6,p,span,img').hover(
            function(){
                $(this).stop().animate({opacity:0.6},'fast');
            },
            function(){
                $(this).stop().animate({opacity:1},'fast');
            }
        );
    </script>
</body>
</html>
