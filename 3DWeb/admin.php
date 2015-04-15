<!DOCTYPE html>
<html>
<head>
    <title>Virtual Museum Admin Panel</title>
    <meta charset="utf8">
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
                <li id="models"><span class="admin-menu-active">Manage Models</span></li>
                <li id="bg"><span>Manage Background</span></li>
            </ul>
        </div>

        <div id="models-panel" class="operate-panel manager-active">
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
                                        echo "<li id=\"$id\"><img src=\"model/$file\"><span>$id</span><span><input type=\"button\" value=\"delete\" ></span><li>";
                                        $id='';
                                    }
                                }
                            }
                        }
                        closedir($dh);
                    }
                }
            }
            listDir("model");
            ?>
            </ul>
        </div>

        <div id="bg-panel" class="operate-panel" style="display:none;">
             <ul>
        <?php
        function listBg($dir){
            if(is_dir($dir)){
                if ($dh = opendir($dir)) {
                    while (($file = readdir($dh)) !== false){
                        if((is_dir($dir."/".$file)) && $file!="." && $file!=".."){
                            echo "<li id=\"\">model/$file<li>";
                            listBg($dir."/".$file."/");
                        }
                        else{
                            if($file!="." && $file!=".."){
                                $ext=explode(".",$file);
                                $id=$ext[0];
                                echo "<li><img src=\"background/$file\"><span>$id</span><span><input type=\"button\" value=\"delete\" ></span><li>";
                                $id='';
                            }
                        }
                    }
                    closedir($dh);
                }
            }
        }
        listBg("background");
        ?>
             </ul>
        </div>
    </section>
    
    <footer class="admin-footer">
        <div>
            <p>Virtual Musuem Built by jQuery & X3DOM & CSS3</p>
        </div>
    </footer>

    <script type="text/javascript">
        $(document).ready(function(){
            $('a,h1,h2,h3,h4,h5,h6,p,span,img').hover(
                function(){
                    $(this).stop().animate({opacity:0.6},'fast');
                },
                function(){
                    $(this).stop().animate({opacity:1},'fast');
                }
            );

            $('.admin-menu ul li').click(function(){
                var type=$(this).attr('id');
                $('.manager-active').fadeOut(400,function(){
                    $('.manager-active').removeClass('manager-active');
                    $('#'+type+"-panel").fadeToggle();
                    $('#'+type+"-panel").addClass('manager-active');
                });
                $('.admin-menu-active').removeClass('admin-menu-active');
                $(this).find('span').addClass('admin-menu-active');
            });

            $('.operate-panel ul li span input').click(function(){
                var file='model/'+$(this).parent().parent().attr('id')+'.x3d';
                var imgurl=$(this).parent().parent().find('img').attr('src');
                console.log(imgurl);
                var this_=$(this).parent().parent();
                $.ajax({
                    url:'deleteModel.php?file='+file,
                    success:function(data){
                            $.ajax({
                                url:'deleteModel.php?file='+imgurl,
                                success:function(data){
                                    if(data=='true'){
                                        this_.fadeOut();
                                    }else{
                                        alert('delete failed');
                                    }
                                }
                            });
                    }
                });
            });
        });
    </script>
</body>
</html>
