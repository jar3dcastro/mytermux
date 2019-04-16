<?php session_start(); ?>
<?php
  function showitems($item,$alias,$p="."){
    $dir = is_dir($item);
    $p.="/$item";
    $weight = $dir?"bold":"normal";
    echo "<p><a href='$p' style='font-weight:$weight' ".($dir?"dir open_=0":"").">$alias</a></p>";
    if($dir){
      $items = scandir($p);
      echo "<div style='padding-left:16px;display:none'>";
      for($i=2;$i<sizeof($items);$i++){
	showitems($items[$i],$items[$i],$p);
      }
      echo "</div>";
    }
  }
?>
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    /* GENERAL */
    *{margin:0px;padding:0px;font-family:"Segoe UI";}
    html,body,#mainWrapper{min-height:100%;height:100%;}
    .middle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
    /* ESPECIFICO */
    section{max-width:800px;margin:0px auto;margin-bottom:0px;position:relative;}
    section>.title{padding:20px;font-size:18px;background-color:#777;color:#fff;}
    section>.content{padding:20px;}
    #greating{width:calc(100% - 40px);text-align:center;}
    a.color{display:inline-block;width:40px;height:40px;border:1px solid #000;;border-radius:20px;}
    a.color+a.color{margin-left:5px;}
    #svg{display:block;margin:auto;}
    #command{display:block;line-height:30px;height:30px;border-radius:15px;padding:0px 15px;margin:auto;border:1px solid #ccc;text-align:center;}
    #command:focus{outline:none;}
    #run{display:block;width:100px;line-height:30px;border-radius:15px;height:30px;margin:10px auto 20px auto;background-color:#777;text-align:center;text-decoration:none;color:#fff;}
  </style>
</head>
<body>
  <div id="mainWrapper">
    <section style="height:100%;">
      <div id="greating" class="middle">Este es el texto de en medio</div>
    </section>
    <section>
      <div class="title">File manager</div>
      <div class="content">
	<?php showitems(".","home/php/"); ?>
      </div>
    </section>
    <section>
      <div class="title">Background</div>
      <div class="content" style="text-align:center">
        <?php $colors=[
          "#fff","#f00","#0f0","#00f"
        ]; ?>
	<?php foreach($colors as $color) { ?>
	  <a href="#" class="color" style="background-color:<?= $color ?>" color="<?= $color ?>"></a>
        <?php } ?>
      </div>
    </section>
    <section>
      <div class="title">Graphics</div>
      <div class="content" id="graphics"></div>
      <input id="command" />
      <a href="#" id="run">RUN</a>
    </section>
    <section>
      <div class="title">End</div>
    </section>
  </div>
</body>
<script type="text/javascript" src="./jquery.min.js"></script>
<script type="text/javascript" src="./graphics.js" async></script>
<script type="text/javascript">
  $("a[dir]").on("click",function(e){
    e.preventDefault();
    $(this).parents("p").next("div").css({"display":($(this).attr("open_")==0?"block":"none")});
    $(this).attr("open_",0+!parseInt($(this).attr("open_")));
  });
  $("a.color").on("click",function(e){
    e.preventDefault();
    $("body").css({"background-color":$(this).attr("color")});
  });
  $("#run").on("click",function(e){
    e.preventDefault();
    setTimeout(()=>eval($("#command").val()),10);
  });
</script>
</html>
