<?php
/**
 * This file is part of Swoft.
 *
 * @link https://swoft.org
 * @document https://doc.swoft.org
 * @contact group@swoft.org
 * @license https://github.com/swoft-cloud/swoft/blob/master/LICENSE
 */

namespace App\Listener;

use Swoft\Bean\Annotation\Listener;
use Swoft\Event\EventHandlerInterface;
use Swoft\Event\EventInterface;
use Swoft\Tcp\Server\Event\TcpServerEvent;
use Swoft\Bean\Annotation\Inject;

/**
 * Event after Tcp request
 * @Listener(TcpServerEvent::RECEIVE)  //消息事件
 */
class ReceiveListener implements EventHandlerInterface
{

    /**
     * @Inject()
     * @var \Swoft\Redis\Redis
     */
    private  $redis;


    /**
     * @param EventInterface $event
     */


    public function handle(EventInterface $event)
    {
          //触发事件
        $params=$event->getParams();
        $fd=$params[0];
        $data=$params[1];
        $server=$params[2];
        $redis=$params[3];
        //判断当前的fd,在redis当中有没有保存视频头

        //不存在信息,保存视频头信息到redis当中
        if(!$redis->get('live_info_'.$fd)){

            //判断是否是头信息,第一次保存
            if(strstr($params[1],'FLV')){
                if(preg_match('/\((.*?)\)/',$data,$match)){
                    //var_dump($match);
                    //var_dump($match[1]); //附加数据,token,房间号
                    //if('合法性判断'){
                    //}
                    //视频头信息
                    var_dump($redis->set('live_info_'.$fd,$data));
                    var_dump($redis->get('live_info_'.$fd));
                }
            }
        }
        //$settings = App::getAppProperties()->get('live'); //获取配置信息
        //需要获取到redis当中,房间里面的fd
        $live=$redis->SMEMBERS('redis_live_'.$fd);
        foreach ($live as $value){
            $value=unserialize($value);
            if($redis->SISMEMBER('redis_connection_'.$value,'header')){
                $server->push($value,$data,WEBSOCKET_OPCODE_BINARY); //二进制
            }else{
                //视频头信息
                $header=$redis->get('live_info_'.$fd);
                //当前客户端已经发送
                $redis->sAdd('redis_connection_'.$value,'header');
                $server->push($value,$header.$data,WEBSOCKET_OPCODE_BINARY); //二进制
            }
            //如果当前客户端是第一次连接就发送
        }


        //srs流媒体






    }
}
