<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Labbi Mobili</title>

    <link rel="stylesheet" href="css/app.css">
</head>
<body>
    <div id="app">
        <messages :socket="socket"
        ></messages>
        <commandline :socket="socket"
        ></commandline>
    </div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.7/socket.io.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>