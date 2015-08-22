<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Demeter - Giải pháp toàn diện cho nông nghiệp Việt Nam</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">

        <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />

        <link rel="apple-touch-icon" href="favicon.svg">
        <link rel="icon" type="image/svg+xml" href="favicon.svg">

        <meta property="og:title" content="Demeter - Giải pháp toàn diện cho nông nghiệp Việt Nam" />
        <meta property="og:description" content="Demeter - Giải pháp toàn diện cho nông nghiệp Việt Nam" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://demeter.vn" />
        <meta property="og:image" content="http://demeter.vn/img/logo.png" />


        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body>
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-65735850-1','auto');ga('send','pageview');
        </script>

        <div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=725762407476961";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>

        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <?php global $activeMenu; ?>

        <div id="navigation">
            <div class="container">
                <a id="logo" href="/">
                    <span class="logo"></span>
                </a>
                <ul id="main-menu" class="menu">
                    <li>
                        <a class="<?php if ($activeMenu == 'home') echo 'active'; ?>" href="/">Trang chủ</a>
                    </li>
                    <li>
                        <a class="<?php if ($activeMenu == 'application') echo 'active'; ?>" href="ung-dung.php">Ứng dụng</a>
                    </li>
                    <!-- <li>
                        <a href="#">Thiết bị</a>
                    </li> -->
                    <li>
                        <a class="<?php if ($activeMenu == 'about') echo 'active'; ?>" href="gioi-thieu.php">Giới thiệu</a>
                    </li>
                </ul>
                <ul id="user-menu" class="menu">
                    <li>
                        <a href="http://demo.demeter.vn/#/login">Đăng nhập</a>
                    </li>
                    <li>
                        <a href="#" class="btn register-action">Đăng ký</a>
                    </li>
                </ul>
            </div>
        </div>