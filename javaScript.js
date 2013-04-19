  $(function() {
    "use strict";

    var ctx = document.getElementById('myCanvas'),
        context = ctx.getContext('2d');

    function Tetr() {

      var _this = this;

      this.backgrWidth = 455;
      this.backgrHeight = 665;
      this.gridX = 13;
      this.gridY = 19;
      this.score = 0;
      this.startX = 100;
      this.startY = 100;
      this.endX = 0;
      this.endY = 0;
      this.isHorizontal = false;
      this.isCube = false;
      this.isLine = false;
      this.isRectangle = false;
      this.reversArr = [];
      this._timeout = 500;
      this._interval = 500;
      this.grid = [];
      this.itemType = {
        figure: {
          cellPosY: 0,
          cellPosX: 0
        }
      };
      this.figure = [
        [
          [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
        ],
        [
          [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
        ],
        [
          [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
        ],
        [
          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
        ],
        [
          [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
        ],
        [
          [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
        ],
        [
          [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
        ]
      ];

      this._fillColor = "#00F";


        
        
      /**
       * Canvas parameters
       */
      ctx.width = this.ctxWidth();
      ctx.height = this.ctxHeight();



      window.onkeyup = function(e) {

        var pressedKey = e.keyCode ? e.keyCode : e.charCode;

        if (pressedKey == 40) _this.upDownArrowPressed();

      }


      window.onkeydown = function(e) {
        var pressedKey = e.keyCode ? e.keyCode : e.charCode;

        if (pressedKey == 37) _this.leftArrowPressed();
        if (pressedKey == 39) _this.rightArrowPressed();
        if (pressedKey == 40) _this.downArrowPressed();
        if (pressedKey == 32) _this.reverceFigure();
        if (pressedKey == 27) _this.pause();

      }



    }



    Tetr.prototype = {

      ctxWidth: function() {
        return this.backgrWidth + 150;
      },
      ctxHeight: function() {
        return this.backgrHeight + 10;
      },
      cellWidth: function() {
        return this.backgrWidth / this.gridX;
      },
      cellHeight: function() {
        return this.backgrHeight / this.gridY;
      },
      draw: function() {
        context.beginPath();
        context.rect(this.itemType.figure.cellPosX, this.itemType.figure.cellPosY, this.cellWidth(), this.cellHeight());
        context.fillStyle = this._fillColor;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();
      },
      timer: function() {
        setTimeout(this.buildMove, this._interval)
      },
      addFigure: function() {

        var randomFigure = parseInt(Math.random() * this.figure.length);


        var elemWeight = this.figure[randomFigure].length;

        for (var i = 0; i < this.gridY; i++) {
          for (var j = 0; j < this.gridX; j++) {

            if (i >= elemWeight) return;

            if (i <= elemWeight && this.grid[i][j] == 2) {

              alert("Game Over!");

            }

            if (this.figure[randomFigure][i][j] == 1) {

              this.grid[i].splice(j, 1, 1);

            }

          }
        }

      },
      buildMove: function() {


        var _this = tetris,
          temporArr = _this.grid.clone();



        for (var i = _this.gridY - 1; i >= 0; i--) {
          for (var j = _this.gridX - 1; j >= 0; j--) {
            if (_this.grid[i][j] == 1) {

              var next = i + 1;

              if (next < _this.gridY && _this.grid[next][j] == 0) {
                _this.grid[next].splice(j, 1, 1);
                _this.grid[i].splice(j, 1, 0);
              } else {
                _this.grid = temporArr.clone();
                _this._interval = _this._timeout;
                _this.buildStatictable();
                _this.checkIfEven();
                _this.addFigure();
              }
            }
          }
        }
        _this.move();
        _this.timer();
      },
      checkIfEven: function() {

        for (var i = this.gridY - 1; i >= 0; i--) {

          this.even(i);

        }

      },
      even: function(i) {



        for (var j = this.gridX - 1; j >= 0; j--) {
          if (this.grid[i][j] != 2) return;
        };

        this.grid.splice(i, 1);
        this.score += 100;
        this.grid.unshift(this.newEmptyLine());
        this.checkIfEven();
      },
      newEmptyLine: function() {
        var newLine = new Array;

        for (var i = 0; i < this.gridX; i++) {
          newLine.push(0);
        };

        return newLine;

      },
      buildStatictable: function() {

        for (var i = this.gridY - 1; i >= 0; i--) {
          for (var j = this.gridX - 1; j >= 0; j--) {
            if (this.grid[i][j] == 1) {

              this.grid[i].splice(j, 1, 2);

            }
          }
        }

      },
      move: function() {
        this.drawBg();

        for (var i = 0; i < this.gridY; i++) {
          for (var j = 0; j < this.gridX; j++) {
            if (this.grid[i][j] == 1 || this.grid[i][j] == 2) {
              this.itemType.figure.cellPosY = this.cellWidth() * i;
              this.itemType.figure.cellPosX = this.cellHeight() * j;
              this.draw();
            }
          }
        }

      },

      // background
      drawBg: function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.beginPath();
        context.rect(0, 0, tetris.backgrWidth, tetris.backgrHeight);
        context.fillStyle = '#F4F4F4';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();
      },
      initialize: function() {
        for (var i = 0; i < this.gridY; i++) {
          this.grid.push([]);
          for (var j = 0; j < this.gridX; j++) {
            this.grid[i].push(0);
          }
        }

        this.addFigure();
        this.timer();

      },
      leftArrowPressed: function() {

        var temporArr = this.grid.clone(),
          k;


        for (var i = 0; i < this.gridY; i++) {
          for (var j = 0; j < this.gridX; j++) {
            k = j - 1;


            if (this.grid[i][j] == 1) {

              if (k < 0 || this.grid[i][k] != 0) {
                this.grid = temporArr.clone();
                return;
              }

              this.grid[i].splice(j, 1, 0);
              this.grid[i].splice(k, 1, 1);

            }
          }
        }

        this.move();



      },
      rightArrowPressed: function() {

        var temporArr = this.grid.clone(),
          k;

        for (var i = this.gridY - 1; i >= 0; i--) {
          for (var j = this.gridX - 1; j >= 0; j--) {
            k = j + 1;


            if (this.grid[i][j] == 1) {

              if (k == this.gridX || this.grid[i][k] != 0) {
                this.grid = temporArr.clone();
                return;
              }

              this.grid[i].splice(j, 1, 0);
              this.grid[i].splice(k, 1, 1);

            }
          }
        }
        this.move();
      },
      downArrowPressed: function() {
        this._interval = 20;
      },
      upDownArrowPressed: function() {
        this._interval = this._timeout;
      },
      figureIs: function() {

        if (this.reversArr.length < this.reversArr[0].length) this.isHorizontal = true;

        if (this.reversArr.length == this.reversArr[0].length) {
          this.isCube = true;
        } else if (this.reversArr.length == 4 || this.reversArr[0].length == 4) {
          this.isLine = true;
        } else if (this.reversArr.length == 2 && this.reversArr[0].length == 3) {
          this.isRectangle = true;
        } else if (this.reversArr.length == 3 && this.reversArr[0].length == 2) {
          this.isRectangle = true;
        }

      },
      checkCollision: function() {

        var paddingRight = this.gridX - 1 - this.endX,
          paddingLeft = this.startX;

        if (paddingRight < 0) {
          this.startX += paddingRight;
          this.endX += paddingRight;
        } else if (paddingLeft < 0) {
          this.startX -= paddingLeft;
          this.endX -= paddingLeft;
        };

        for (var i = this.startY; i <= this.endY; i++) {
          for (var j = this.startX; j <= this.endX; j++) {
            if (this.grid[i][j] == 2 || this.grid[i][j] == undefined) {

              return false;

            };

          }
        }

        return true;

      },
      getStartPos: function() {
        for (var i = 0; i < this.grid.length; i++) {
          for (var j = 0; j < this.grid[i].length; j++) {

            if (this.grid[i][j] == 1 && this.startX > j) {
              this.startX = j;
            }
            if (this.grid[i][j] == 1 && this.endX < j) {
              this.endX = j;
            }

            if (this.grid[i][j] == 1 && this.startY > i) {
              this.startY = i;

            }
            if (this.grid[i][j] == 1 && this.endY < i) {
              this.endY = i;

            }
          }
        }
      },
      getFifure: function() {
        var m = -1;
        for (var i = this.startY; i <= this.endY; i++) {
          this.reversArr.push([]);
          m++;
          for (var j = this.startX; j <= this.endX; j++) {
            this.reversArr[m].push(this.grid[i][j]);

          }

        }

      },
      refineStartPos: function() {

        if (this.isRectangle && this.isHorizontal) {
          this.endX--;
          this.endY++;
        } else if (this.isRectangle && !this.isHorizontal) {
          this.endX++;
          this.endY--;
        } else if (this.isLine && this.isHorizontal) {
          this.startX++;
          this.startY -= 2;
          this.endX -= 2;
          this.endY++;
        } else if (this.isLine && !this.isHorizontal) {
          this.startX--;
          this.startY += 2;
          this.endX += 2;
          this.endY--;
        };
      },
      addFigureToNewArr: function(reversedArr) {

        var temporArr = this.grid.clone(true);

        for (var i = 0; i < this.gridY; i++) {
          for (var j = 0; j < this.gridX; j++) {

            if (this.startY <= i && this.startX <= j && this.endY >= i && this.endX >= j) {

              var p = reversedArr[reversedArr.length - 1].shift();
              if (reversedArr[reversedArr.length - 1].length == 0) var _del = reversedArr.pop();

              temporArr[i].splice(j, 1, p);
            }
          }
        }

        this.grid = temporArr.clone();

      },
      reverceFigure: function() {

        this.resetAllFlags();

        this.getStartPos();
        this.getFifure();
        this.figureIs();

        var reversedArr = this.reversArr.reverse();

        this.refineStartPos();

        if (this.checkCollision()) {
          this.addFigureToNewArr(reversedArr);
          this.move();
        }

      },
      resetAllFlags: function() {
        this.isHorizontal = false;
        this.isCube = false;
        this.isLine = false;
        this.isRectangle = false;
        this.startX = this.gridY;
        this.startY = this.gridY;
        this.endX = 0;
        this.endY = 0;
        this.reversArr = [];
      },
      pause: function() {
        alert("pause");
      }
    };



    Array.prototype.clone = function(clear) {

      var newArr = new Array;

      for (var i = 0; i < this.length; i++) {
        newArr.push([]);
        for (var j = 0; j < this[i].length; j++) {

          if (clear) {
            if (this[i][j] == 1) {
              newArr[i].push(0);
            } else {
              newArr[i].push(this[i][j]);
            }
          } else {
            newArr[i].push(this[i][j]);
          }

        }

      }
      return newArr;
    };

    Array.prototype.reverse = function() {

      var newArr = new Array;

      for (var i = tetris.endX - tetris.startX; i >= 0; i--) {
        newArr.push([]);
      }
      for (var i = tetris.endX - tetris.startX; i >= 0; i--) {
        for (var j = 0; j <= tetris.endY - tetris.startY; j++) {


          newArr[i].push(tetris.reversArr[j][i]);

        }
      }
      return newArr;
    };



    var tetris = new Tetr();


    tetris.initialize(); //__>



  });