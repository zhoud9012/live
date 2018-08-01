var BGH5Video;
(function (b) {
    (function (b) {
        var c = function () {
            function a(a) {
                this.frame = 1E3;
                this.currentCount = this.intervalID = 0;
                this.running = !1;
                this.frame = a
            }

            a.prototype.start = function () {
                clearInterval(this.intervalID);
                this.currentCount = 0;
                this.running = !0;
                this.intervalID = setInterval(this.onTimerPro.bind(this), this.frame)
            };
            a.prototype.stop = function () {
                clearInterval(this.intervalID);
                this.running = !1;
                this.currentCount = 0
            };
            a.prototype.reset = function () {
                this.stop()
            };
            a.prototype.onTimerPro = function () {
                this.currentCount++;
                if (this.onTimerHandler) this.onTimerHandler()
            };
            return a
        }();
        b.Timer = c
    })(b.media || (b.media = {}))
})(BGH5Video || (BGH5Video = {}));
(function (b) {
    (function (b) {
        var c = function () {
            function a() {
            //     //this.needWork = this._isWork = !1;
            //     //this.currentUrl = null;
            //     //this._bufferLen = 2E3;
            //     //this.isTry = !1;
            //     //this.count = 0;
            //     //this.timeArr = [0, 3, 7, 15, 30];
            //     //this.isReceviveAudio = !0;
            //     //this.monitorTimer = new b.Timer(1E3);
            //    // this.monitorTimer.onTimerHandler = this.onTimerHandler.bind(this)
             }

            // Object.defineProperty(a.prototype, "isWork", {
            //     get: function () {
            //         return this._isWork
            //     }, enumerable: !0, configurable: !0
            // });

            Object.defineProperty(a.prototype, "canvas", {
                get: function () {
                    this._canvas || (this._canvas =
                        document.createElement("Canvas"), this.webGLCanvas = new WebGLCanvas(this._canvas, !1, {}));
                    return this._canvas
                }, set: function (a) {
                    a && (this._canvas = a, this.webGLCanvas = new WebGLCanvas(this._canvas, !1, {}))
                }, enumerable: !0, configurable: !0
            });


             a.prototype.init = function () {
                this.webGLCanvas || (this.webGLCanvas = new WebGLCanvas(this.canvas, !1, {}));
                this.fc || (
                    this.fc = new FlvClient,
                    this.fc.receviveAudio = this.isReceviveAudio
                    //this.fc.onWsOpen = this.onOpenHandler.bind(this),
                    //this.fc.onWsError = this.onErrorHandler.bind(this),
                    //this.fc.onWsClose = this.onCloseHandler.bind(this),
                    //this.fc.onNetStatus = this.onNetStatus.bind(this),
                    //this.fc.bufferLen = this._bufferLen
                    )
            };

            // Object.defineProperty(a.prototype, "bufferLen", {
            //     get: function () {
            //         return this._bufferLen
            //     }, set: function (a) {
            //         console.log(a);
            //         this._bufferLen = a;
            //         this.fc && (this.fc.bufferLen = this._bufferLen)
            //     }, enumerable: !0, configurable: !0
            // });

            // a.prototype.clearCanvas = function () {
            // };

            a.prototype.renderFrameHandler = function () {
                
                if (this.onRenderFrameHandler && this._canvas){
                       this.onRenderFrameHandler(this._canvas)
                 }
            };


            // a.prototype.onNetStatus =
            //     function (a) {
            //     };
           /* a.prototype.onErrorHandler = function (a) {
                this._isWork = !1;
                this.check()
            };

            a.prototype.onCloseHandler = function (a) {
                this._isWork = !1;
                this.check()
            };
            a.prototype.onOpenHandler = function (a) {
                this._isWork = !0;
                this.monitorTimer.stop()
            };*/

            a.prototype.startDecode = function (a) {
               
                void 0 === a && (a = null);
                if (null != a && "" != a || this.currentUrl) {
                    this.needWork = !0, this._isWork = !1, this.currentUrl != a && a && (this.currentUrl = a), 
                    this.init(),
                    this.webGLCanvas.renderFrameHandler = this.renderFrameHandler.bind(this),
                    this.fc.play.call(this.fc,this.currentUrl, this.webGLCanvas)

                }
            };

            a.prototype.stop = function () {
                //this._isWork = this.needWork = !1;
                //this.close()
            };
            a.prototype.close = function () {
                //this.fc && this.fc.close.call(this.fc)
            };
            a.prototype.tryWork = function () {
                //this.needWork && !this._isWork && (this.isTry = !0, this.startDecode())
            };
            a.prototype.check = function () {
                //this.isTry = !1;
               // this.needWork && !this._isWork && (this.monitorTimer.running ? (this.count++, this.count >= this.timeArr.length && (this.count = 0)) : (this.count = 0, this.monitorTimer.start()))
            };
            a.prototype.onTimerHandler =
               // function () {
                //    this.isTry ? 25 < this.monitorTimer.currentCount && (this.isTry = !1, this.monitorTimer.reset(), this.monitorTimer.start(), this.close()) : this.monitorTimer.currentCount >= this.timeArr[this.count] && (this.monitorTimer.reset(), this.monitorTimer.start(), this.tryWork())
               // };
            a.prototype.receviveAudio = function (a) {
                this.isReceviveAudio = a;
                this.fc && (this.fc.receviveAudio = this.isReceviveAudio)
            };
            return a
        }();
        b.FLVDecoder = c
    })(b.media || (b.media = {}))
})(BGH5Video || (BGH5Video = {}));
(function (b) {
    (function (d) {
        var c = function () {
            function a() {
                //this.pausing = !1;
                //this.isReceviveAudio = !0;
               // if (null != a.instance) throw Error(a.SINGLETON_MSG);
                this.init();
                a.instance = this
            }

            a.getInstance = function () {
                null == a.instance && (a.instance = new a);
                return a.instance
            };
            a.prototype.renderFrameHandler = function (a) {
                //console.log(a);
                if (this.onRenderFrameHandler && !this.pausing) this.onRenderFrameHandler(a)
            };
            Object.defineProperty(a.prototype, "canvas", {
                set: function (a) {
                    this.decoder.canvas = a
                }, enumerable: !0, configurable: !0
            });

            a.prototype.init =function () {
                    this.decoder || (this.decoder = new b.media.FLVDecoder,
                        this.decoder.onRenderFrameHandler = this.renderFrameHandler.bind(this)
                    )
                };
            a.prototype.play = function (a, b) {
                this.currentUrl = a;
                //this.stopPlay();
               // this.pausing = !1;
                this.decoder.startDecode(this.currentUrl)

            };
            a.prototype.pause = function () {
            };
            a.prototype.stopPlay = function () {
               // this.decoder && this.decoder.stop()
            };
            a.prototype.receviveAudio = function (a) {
                this.isReceviveAudio = a;
                this.decoder && this.decoder.receviveAudio(this.isReceviveAudio)
            };
            Object.defineProperty(a.prototype, "bufferLen", {
                // get: function () {
                //     return this.decoder ? this.decoder.bufferLen : 0
                // }, set: function (a) {
                //     this.decoder && (this.decoder.bufferLen = a)
                // }, enumerable: !0, configurable: !0
            });
            return a
        }();
        //c.SINGLETON_MSG = "VideoManager Singleton already constructed!";
        d.VideoManager = c
    })(b.media || (b.media = {}))
})(BGH5Video || (BGH5Video = {}));
