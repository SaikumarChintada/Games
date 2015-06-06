# 2 Player Game (no AI)
#Credits  :  ernest_scribbler and Yuushi (stackoverflow handles - both)  
#URL:  http://codereview.stackexchange.com/questions/24934/help-with-refactoring-my-tic-tac-toe-game
#           (slightly modified)
# Game() class controls Player() and Board().
#Player() and Board donot interfere each other.
#Remark : Good model-script for learning oops in python.
#[Pending] Add AI Features (alpha-beta puring - state space search)
#
#
class Board(object):
    """Represents tic tac toe board"""
    #private var so that no one can change this
    _winning_pos = [[0,1,2],[3,4,5],[6,7,8], # up and down
                        [0,3,6],[1,4,7],[2,5,8], # across
                        [0,4,8],[2,4,6]]         # diagonal
    def __init__(self):
        self.moves = '012345678'
        self.board = [i for i in ' '*9]

    def __str__(self):#good repr
        ls = ''
        for i in range(9):
            ls += self.board[i]
            ls += '|'
            if i == 2  or i == 5 or i == 8:
                ls += '\n'
        return ls

    def found_Winner(self):
        """Wining combinations. Returns Player or None"""
        for tripple in Board._winning_pos:
            if self.allEqual(tripple) == True:
                return True
        return False
                    
    def allEqual(self,tripple):
        if self.board[tripple[0]]!= ' 'and \
         self.board[tripple[0]] == self.board[tripple[1]] == self.board[tripple[2]] :
            return True
        else: return False
    def noMovesLeft(self):
        res = False
        if ' ' not in self.board:
            res = True
            print 'Draw'
        return res

    def gameOver(self):
        return self.found_Winner() or self.noMovesLeft()

class Player(object):
    board = []
    """ Represents player and his/her moves"""
    def __init__(self,piece, board = Player.board):
        Player.board = board
        self.piece = piece

    def __str__(self): return 'player_'+str(self.piece)

    def Move(self):
        print str(self)
        return self.getMove()

    def getMove(self):
        inpt = input('pos. you want to place your piece :')
        return self.makeMove(int(inpt))

    def makeMove(self, move):

        if Player.board[move] != ' ' or move >8 or move < 0:
            return False
        Player.board[move] = self.piece
        print 'here',Player.board
        return True

class Game(object):
    def __init__(self):
        self.board = Board()
        print self.board
        self.player_x = Player('x',self.board.board)
        self.player_o = Player('o',self.board.board)
        self._currentPlayer = self.player_x
    
    def start(self):
        while not self.gameOver():
            if self._currentPlayer.Move():
                self.swapPlayer()
            print self.board
        self._atGameEnd()

    def gameOver(self):
        return self.board.gameOver()

    def swapPlayer(self):
        if self._currentPlayer == self.player_x:
            self._currentPlayer = self.player_o
        else:self._currentPlayer = self.player_x

    def _atGameEnd(self):
        print 'winner is not',self._currentPlayer.piece
        print 'end of the game'

def main():
    welcome_msg = 'welcome'
    print welcome_msg
    g = Game()
    g.start()


if __name__ == '__main__':
    main()
