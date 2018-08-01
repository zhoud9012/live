<?php
/**
 * This file is part of Swoft.
 *
 * @link https://swoft.org
 * @document https://doc.swoft.org
 * @contact group@swoft.org
 * @license https://github.com/swoft-cloud/swoft/blob/master/LICENSE
 */

namespace App\Controllers;

use Swoft\Http\Server\Bean\Annotation\Controller;
use Swoft\Http\Server\Bean\Annotation\RequestMapping;
use Swoft\Http\Server\Bean\Annotation\RequestMethod;
use Swoft\Rpc\Server\Rpc\RpcServer;
use Swoft\Tcp\Server\Tcp\TcpServer;

// use Swoft\View\Bean\Annotation\View;
// use Swoft\Http\Message\Server\Response;

/**
 * Class LiveController
 * @Controller(prefix="live")
 * @package App\Controllers
 */
class LiveController{
    /**
     * this is a example action. access uri path: live
     * @RequestMapping(route="live", method=RequestMethod::GET)
     * @return array
     */
    public function index()
    {
         var_dump(new TcpServer());
        $name='peter';
         $data = compact('name');
         var_dump($data);
         return view('live/index');
    }
}
