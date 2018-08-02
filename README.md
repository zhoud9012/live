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

## srs
编译srs
```
./configure --prefix=/usr/local/srs --with-ssl --with-hls --with-hds --with-dvr --with-nginx --with-http-callback --with-http-server --with-stream-caster --with-http-api --with-ffmpeg --with-transcode --with-ingest --with-stat --with-librtmp --with-research --with-utest --with-gperf --with-gprof

make && make install
```
## srs配套第三方应用
第三方应用启动：
```
sudo ./objs/nginx/sbin/nginx  
./objs/ffmpeg/bin/ffmpeg    
python ./research/api-server/server.py 8085
```

查看版本
```
./objs/srs -v
```

## 配置rtmp

```
listen              1935;
pid                ./objs/srs.pid;
chunk_size         60000;
ff_log_dir          ./objs;
srs_log_tank        file;
# 配置日志答应到文件，需要和srs_log_level配合使用
srs_log_level       trace;
# 制定配置文件的级别，默认级别是trace
srs_log_file        ./objs/srs.log;
# 制定日志文件的位置。
max_connections     1000;
# 最大连接数
daemon              on;
# 以daemon的方式启动，如果要启动在console，那么需要配置daemon off;并且，需要配置srs_log_tank console;
utc_time            off;
# 是否使用utc时间。如果该值为off则使用本地时间，如果开始使用utc时间。

vhost __defaultVhost__ {
# 默认的vhost，在没有指明vhost的情况，默认使用这个vhost。
}

```

## rtmp 服务启动
```
./objs/srs  -c  ./conf/rtmp.conf
```

# 其他支持
需要安装同步redis & 异步redis 客户端

# 服务端流程
*  流程:
	* 1.先客户端请求服务端在redis中缓存fd
	* 2.关闭服务端
	* 3.开启服务端
	* 4.推流
	* 5.再次刷新客户端
