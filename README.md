# live
swoole 实现视屏推流

swoft 视屏推流
===========================

## client
客户端请求服务端建立ws渲染视屏

## ffmpeg
编译好的绿色版 ffmpeg 直接可以用

推流命令
```
./ffmpeg -i rtmp://live.hkstv.hk.lxdns.com/live/hks -r 26 -filter:a "atempo=1.0,adelay=196|196"   -ar 44100 -acodec mp3   -profile baseline   -level:v 3.1  -tune zerolatency  -metadata title="(code=peter)"    -preset ultrafast   -vcodec  libx264  -f flv  tcp://127.0.0.1:9504
```

## server

服务端启动命令
```
php bin/swoft ws:start
```

#其他支持
需要安装同步redis & 异步redis 客户端

*流程:
	*1.先客户端请求服务端在redis中缓存fd
	*2.关闭服务端
	*3.开启服务端
	*4.推流
	*5.再次刷新客户端
