function create_table(rows,cols){
	var board = $('#board');
	for(var i =0;i<rows;i++){
		for(var j = 0;j<cols;j++){
			var div = document.createElement('div');
			div.id=i*3+j;
			div.className = "block";
			board.append(div);
		}
		board.append('<br>');
	}
}

var ttt_board = ['','','','','','','','',''];
var player_marker = 'x';
var ai_marker = 'o';
var last_move;


//dumb AI
function ai_next_move(){
	console.log(last_move);
	var next = (last_move + 1)%9;
	var count =0;
	while(count <=9){
		if(valid_position(next)){
			ttt_board[next] = 'o';
			var str = '#'+next.toString();
			$(str).html('o');
			break;
		}
		next = (next +1)%9;
		count += 1;
	}
}

function valid_position(id){
	if(ttt_board[id]===''){
		return true;
	}
	return false;
}

function update(id){
	ttt_board[id] = 'x';
	var str = '#'+id.toString();
	$(str).html('x');
}

function init(){
	create_table(3,3);
	$('.block').on('click',function(){
		var id = $(this).attr('id');
		if( valid_position(id) ){
			last_move = id;
			update(id);
			ai_next_move();
		}
	});
}

$(document).ready(init);