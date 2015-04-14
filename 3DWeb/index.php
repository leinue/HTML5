<!DOCTYPE html>
<html>
<head>
    <title>Virtual Museum</title>
    <script type="text/javascript" src="http://www.x3dom.org/download/x3dom.js"></script>
    <link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/x3dom.css"></link>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
</head>
<body>
    <x3d id="tdobj-display">
        <scene>
        <transform DEF="ball">
            <appearance>
                <material diffuseColor='1 0 0'></material>
            </appearance>
            <navigationInfo id="head" headlight='true' type='"EXAMINE"'></navigationInfo>
            <background  skyColor="0 0 0"></background>
            <Viewpoint position="-0.25762 3.85703 6.74621" orientation="-0.99104 -0.13344 -0.00551 0.46917"></Viewpoint>
            <directionalLight id="directional" direction='0 -1 0' on ="TRUE" intensity='2.0' shadowIntensity='0.2'></directionalLight>
            <PointLight id='point' on='TRUE' intensity='0.9000' ambientIntensity='0.0000' color='0.0 0.6 0.0' location='2 10 0.5 '  attenuation='0 0 0' radius='5.0000'> </PointLight>
            <SpotLight id='spot' on ="TRUE" beamWidth='1' color='250 0 1' cutOffAngle='0.78' location='0 0 12' radius='22'></SpotLight>
            <inline nameSpaceName="tower" id="x3d-display" mapDEFToID="true" onclick="displayInfo(this)" url="model/bull.x3d"></inline>
            <Transform translation="0 -5.0 0" rotation="1 0 0 -1.57">
                <Shape>
                    <Appearance><Material diffuseColor="0.5 0.5 0.5"></Material></Appearance>
                    <Plane solid="false" size="4 4"></Plane>
                </Shape>
            </Transform>
        </transform>
        <timeSensor DEF="time" cycleInterval="2" loop="true"></timeSensor>
        <PositionInterpolator DEF="move" key="0 0.5 2" keyValue="0 0 0  2 3 6  10 0 0"></PositionInterpolator>
        <Route fromNode="time" fromField ="fraction_changed" toNode="move" toField="set_fraction"></Route>
        <Route fromNode="move" fromField ="value_changed" toNode="ball" toField="translation"></Route>
        </scene>
    </x3d>
    
    <div id="title-panel" class="operate-panel"><span>VIRTUAL MUSEUM</span></div>
    
    <div id="interactive-panel" class="operate-panel">
        <ul>
            <li>Camera</li>
            <li>Lights</li>
            <li>Themes</li>
        </ul>
    </div>

    <div id="list-panel" class="operate-panel">
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
    
    <div id="panel-Lights" class="little-panel">
        
        <div class="lights">
            <input type="checkbox" checked="true" onclick="lightSwitch('point')">
            <label>point light</label>
        </div>

        <div class="lights">
            <input type="checkbox" checked="true" onclick="lightSwitch('spot')">
            <label>spot light</label>
        </div>
    
        <div class="lights">
            <input type="checkbox" checked="true" onclick="lightSwitch('directional')">
            <label>directional light</label>
        </div>
    
        <div class="lights">
            <input type="checkbox" checked="true" onclick="headlight()">
            <label>headlight</label>
        </div>

    </div>

    <div id="panel-Camera" class="little-panel">
        <ul>
            <li>EXAMINE</li>
            <li>WALK</li>
            <li>FLY</li>
            <li>LOOK AT</li>
            <li>TURANTABLE</li>
            <li>GAME</li>
        </ul>
    </div>

    <div id="panel-Themes" class="little-panel">
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
                                echo "<li>$id<li>";
                                $id='';
                            }
                        }
                    }
                    closedir($dh);
                }
            }
        }
        //开始运行
        listBg("background");
        ?>
        </ul>
    </div>

    <div id="model-desc" class="operate-panel">
        <p id="desc-bull">
            The element embryo outlines the tobacco mosaic thickly todownturn
The bottle body describes at the beginning of peony like you 
Slowly penetration window concern I however
On the xuan paper writes rapidly to this puts one half 
        </p>
        
        <p id="desc-chicken">
            The glaze color exaggerates the female court attendant to attempt theflavor to harbor
But you as soon as smiles like is in bud
Your American wisp scatters could not go to me the place and so on the misty rain but I am waiting for you
The smoke from kitchen chimneys curls raises separates theriver surely in imitated the previous dynasty in the bottle bottom bookthe elegance
On when me for meets your foreshadowing 
        </p>

        <p id="desc-vase">
            Color white brocade carp vividly Yu Wande
When copy Song typeface inscription actually keeps thinkingabout you
You hide in in the millennium secret
Extremely exquisitely just like the embroidery needle to fallto the ground
Outside the curtain the Japanese banana annoys the suddendownpour knocker to annoy the verdigris
But I passed by that Chiangnan young town to annoy you
In splashes ink in the landscape painting you to hide from theblack color deep place 
        </p>

        <p id="desc-dbvase">
            Outside the Japanese banana curtain the rain sound isanxious,
In the blue and white porcelain the appearance is old.
Low-spirited being overwhelmed with emotion, only leaves is over.
        </p>
    </div>
    
    <footer>
        <div>
            <p>Built by jQuery & X3DOM & CSS3</p>
        </div>
    </footer>

    <script type="text/javascript">
    
        function lightSwitch(){
            var light = document.getElementById(id);
            if(light.getAttribute('on')!='TRUE')
                light.setAttribute('on','TRUE');
            else
                light.setAttribute('on','FALSE');
        }

        function headlight(){
            var h = document.getElementById("head");
            if(h.getAttribute('headlight')=='true')
                h.setAttribute('headlight', 'false');
            else
                h.setAttribute('headlight', 'true');
        }

        function displayInfo(obj){
            $('.d-active').css('display','none');
            $('.d-active').removeClass('d-active');
            var name=$(obj).attr('url').split('.');
            $('#model-desc #desc-'+name[0]).css('display','block');
            $('#model-desc #desc-'+name[0]).addClass('d-active');
            $('#model-desc').slideToggle();
        }

        $(document).ready(function(){

            //load models using ajax
            /*$.ajax({
                url:"loadModel.php",
                success:function(data){
                    $('#list-panel ul').append(data);
                }
            });*/

            $('ul li,a,h1,h2,h3,h4,h5,h6,p,span,.lights').hover(
                function(){
                    $(this).stop().animate({opacity:0.6},'fast');
                },
                function(){
                    $(this).stop().animate({opacity:1},'fast');
                }
            );

            $('#title-panel').click(function(){
                $('#interactive-panel,#list-panel').slideToggle();
            });

            $('#interactive-panel ul li').click(function(){
                var elemClicked=$(this).html();
                if(elemClicked!='Animating'){
                    $('#panel-'+elemClicked).slideToggle();
                    $('.little-panel').each(function(){
                        var list=$(this).attr('id').split('-')[1];
                        if(list!=elemClicked && $(this).css('display')!='none'){
                            $(this).slideToggle();
                        }
                    });
                }else{

                }
                //$('#panel-'+$(this).)
            });

            $('#list-panel ul li').click(function(){
                $('#x3d-display').attr('url','model/'+$(this).attr('id')+'.x3d');
            });

            $('#panel-Camera ul li').click(function(){
                $('#head').attr('type',$(this).html());
                $(this).parent().parent().slideToggle();
            });

            $('#panel-Themes ul li').click(function(){
                $('body').css('background','url(background/'+$(this).html()+'.jpg)').css('backgroundSize','cover');
                $(this).parent().parent().slideToggle();                
            });

            $('#list-panel ul li').dblclick(function(){
                var url=document.location.href+'model/'+$(this).attr('id')+'.x3d';
                var a=$("<a href='"+url+"' target='_blank'>download</a>").get(0);  
                var e=document.createEvent('MouseEvents');
                e.initEvent('click', true, true);  
                a.dispatchEvent(e); 
            });
        });

    </script>
</body>
</html>
