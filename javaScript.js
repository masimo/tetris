      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var figure = {
         0: [
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
         ],
         1: [
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
         ],
         2: [
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
         ],
         3: [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
         ],
         4: [
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
         ],
         5: [
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
         ],
         6: [
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
         ]
      };


      var Tetr = {
         backgrWidth: 350,
         backgrHeight: 525,
         gridX: 10,
         gridY: 15,
         score: 0,
         itemType: {
            figure: {
               cellPosY: 0,
               cellPosX: 0,
            }
         },
         _fillColor: "#00F",
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

            var randomFigure = parseInt(Math.random()*7);


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
            }
            this.grid.splice(i, 1);
            this.score += 100;
            this.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            this.checkIfEven();
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
         reverceFigure: function() {

            var temporArr = Tetr.grid.clone(true);
            var reversArr = new Array;
            var reversedArr = new Array;
            var m = -1,
               startX = startY = Tetr.gridY + 1,
               endX = endY = 0,
               centreX = centreY = 0;
            var horizontal = cube = line = false;


            for (var i = 0; i < Tetr.grid.length - 1; i++) {
               for (var j = 0; j < Tetr.grid[i].length - 1; j++) {


                  if (Tetr.grid[i][j] == 1 && startX > j) {
                     startX = j;
                  }
                  if (Tetr.grid[i][j] == 1 && endX < j) {
                     endX = j;
                  }

                  if (Tetr.grid[i][j] == 1 && startY > i) {
                     startY = i;

                  }
                  if (Tetr.grid[i][j] == 1 && endY < i) {
                     endY = i;

                  }
               }
            }
            // get array

            for (var i = startY; i <= endY; i++) {
               reversArr.push([]);
               m++;
               for (var j = startX; j <= endX; j++) {

                  reversArr[m].push(Tetr.grid[i][j]);

               }

            }
            // Reverse array
            for (var i = endX - startX; i >= 0; i--) {
               reversedArr.push([]);
            }
            for (var i = endX - startX; i >= 0; i--) {
               for (var j = 0; j <= endY - startY; j++) {



                  reversedArr[i].push(reversArr[j][i]);

               }
            }

            if (reversArr.length < reversArr[0].length) {
               horizontal = true;
            } else if (reversArr.length == reversArr[0].length) {
               cube = true;
            } else if (reversArr.length > reversArr[0].length) {
               horizontal = false;
            }
            if (reversArr.length >= 4 || reversArr[0].length >= 4) {
               line = true;
            }

            // add array

            if (startX > temporArr[0].length - 3) {
               startX = temporArr[0].length - 3;
            } else if (startY > temporArr.length - 3) {
               startY = temporArr[0].length - 3;
            }

            var midY = parseInt((endY - startY + 1) / 2),
               midX = parseInt((endX - startX + 1) / 2);


            if (horizontal && !cube && !line) {
               endY = endY + midY;
               endX = endX - midX;
            } else if (!horizontal && !cube && !line) {
               endY = endY - midY;
               endX = endX + midX;
            } else if (line && horizontal) {
               startX = startX + 1;
               startY = startY - 1;
               endY = endY + midX;
               endX = endX - midX;
            } else if (line && !horizontal) {
               startX = startX - 1;
               startY = startY + 1;
               endY = endY - midY;
               endX = endX + midY;
            }



            for (var i = 0; i < Tetr.grid.length - 1; i++) {
               for (var j = 0; j < Tetr.grid[i].length - 1; j++) {

                  if (startY <= i && startX <= j && endY >= i && endX >= j) {

                     var p = reversedArr[reversedArr.length - 1].shift();
                     if (reversedArr[reversedArr.length - 1].length == 0) var _del = reversedArr.pop();

                     temporArr[i].splice(j, 1, p);
                  }
               }
            }

            Tetr.grid = temporArr.clone();
            Tetr.move();
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