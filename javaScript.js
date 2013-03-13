      var ctx = document.getElementById('myCanvas'),
         context = ctx.getContext('2d'),
         figure = [
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


      var Tetr = {
         backgrWidth: 420,
         backgrHeight: 595,
         gridX: 12,
         gridY: 17,
         score: 0,
         startX: 100,
         startY: 100,
         endX: 0,
         endY: 0,
         isHorizontal: false,
         isCube: false,
         isLine: false,
         isRectangle: false,
         reversArr: [],
         itemType: {
            figure: {
               cellPosY: 0,
               cellPosX: 0,
            }
         },
         _fillColor: "#00F",
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
         _timeout: 500,
         _interval: 500,
         grid: [],
         draw: function() {
            context.beginPath();
            context.rect(this.itemType.figure.cellPosX, this.itemType.figure.cellPosY, Tetr.cellWidth(), Tetr.cellHeight());
            context.fillStyle = this._fillColor;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.stroke();
         },
         timer: function() {
            setTimeout(Tetr.buildMove, Tetr._interval)
         },
         addFigure: function() {

            var randomFigure = parseInt(Math.random() * figure.length);


            var elemWeight = figure[randomFigure].length;

            for (var i = 0; i < this.gridY; i++) {
               for (var j = 0; j < this.gridX; j++) {

                  if (i >= elemWeight) return;

                  if (i <= elemWeight && this.grid[i][j] == 2) {

                     alert("Game Over!");

                  }

                  if (figure[randomFigure][i][j] == 1) {

                     this.grid[i].splice(j, 1, 1);

                  }

               }
            }

         },
         buildMove: function() {

            var temporArr = Tetr.grid.clone();



            for (var i = Tetr.gridY - 1; i >= 0; i--) {
               for (var j = Tetr.gridX - 1; j >= 0; j--) {
                  if (Tetr.grid[i][j] == 1) {

                     var next = i + 1;

                     if (next < Tetr.gridY && Tetr.grid[next][j] == 0) {
                        Tetr.grid[next].splice(j, 1, 1);
                        Tetr.grid[i].splice(j, 1, 0);
                     } else {
                        Tetr.grid = temporArr.clone();
                        Tetr._interval = Tetr._timeout;
                        Tetr.buildStatictable();
                        Tetr.checkIfEven();
                        Tetr.addFigure();
                     }
                  }
               }
            }
            Tetr.move();
            Tetr.timer();
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

            for (var i = 0; i < Tetr.gridX; i++) {
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
            drawBg();

            for (var i = 0; i < Tetr.gridY; i++) {
               for (var j = 0; j < Tetr.gridX; j++) {
                  if (Tetr.grid[i][j] == 1 || Tetr.grid[i][j] == 2) {
                     Tetr.itemType.figure.cellPosY = Tetr.cellWidth() * i;
                     Tetr.itemType.figure.cellPosX = Tetr.cellHeight() * j;
                     Tetr.draw();
                  }
               }
            }

         },
         buildMatrix: function() {
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

            var temporArr = this.grid.clone();


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

            var temporArr = this.grid.clone();

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
            Tetr._interval = 20;
         },
         upDownArrowPressed: function() {
            Tetr._interval = Tetr._timeout;
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

            var temporArr = Tetr.grid.clone(true);

            for (var i = 0; i < this.gridY; i++) {
               for (var j = 0; j < this.gridX; j++) {

                  if (this.startY <= i && this.startX <= j && this.endY >= i && this.endX >= j) {

                     var p = reversedArr[reversedArr.length - 1].shift();
                     if (reversedArr[reversedArr.length - 1].length == 0) var _del = reversedArr.pop();

                     temporArr[i].splice(j, 1, p);
                  }
               }
            }

            Tetr.grid = temporArr.clone();

         },
         reverceFigure: function() {

            Tetr.resetAllFlags();

            Tetr.getStartPos();
            Tetr.getFifure();
            Tetr.figureIs();

            var reversedArr = Tetr.reversArr.reverse();

            Tetr.refineStartPos();

            if (this.checkCollision()) {
               Tetr.addFigureToNewArr(reversedArr);
               Tetr.move();
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

      ctx.width = Tetr.ctxWidth();
      ctx.height = Tetr.ctxHeight();

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

         for (var i = Tetr.endX - Tetr.startX; i >= 0; i--) {
            newArr.push([]);
         }
         for (var i = Tetr.endX - Tetr.startX; i >= 0; i--) {
            for (var j = 0; j <= Tetr.endY - Tetr.startY; j++) {


               newArr[i].push(Tetr.reversArr[j][i]);

            }
         }
         return newArr;
      };

      // background
      drawBg = function() {
         context.clearRect(0, 0, context.canvas.width, context.canvas.height);
         context.beginPath();
         context.rect(0, 0, Tetr.backgrWidth, Tetr.backgrHeight);
         context.fillStyle = '#F4F4F4';
         context.fill();
         context.lineWidth = 1;
         context.strokeStyle = 'black';
         context.stroke();
      }


      Tetr.buildMatrix();


      window.onkeyup = function(e) {

         var pressedKey = e.keyCode ? e.keyCode : e.charCode;

         if (pressedKey == 40) Tetr.upDownArrowPressed();

      }


      window.onkeydown = function(e) {
         var pressedKey = e.keyCode ? e.keyCode : e.charCode;

         if (pressedKey == 37) Tetr.leftArrowPressed();
         if (pressedKey == 39) Tetr.rightArrowPressed();
         if (pressedKey == 40) Tetr.downArrowPressed();
         if (pressedKey == 32) Tetr.reverceFigure();
         if (pressedKey == 27) Tetr.pause();

      }