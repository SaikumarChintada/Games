
var ttt_board = ['','','','','','','','',''];
var sim_board = ['','','','','','','','',''];
//2d-array board representation is better

var player_marker;
var ai_marker;
var last_move;

//dumb AI
function ai_next_move(){
	console.log(last_move);
	var next = (last_move + 1)%9;
	var count =0;
	while(count <=9){
		if(valid_position(next)){
			ttt_board[next] = ai_marker;
			var str = '#'+next.toString();
			$(str).html(ai_marker);
			break;
		}
		next = (next +1)%9;
		count += 1;
	}
}

function is_game_over(){
	win_pos = [[0,1,2],
				[3,4,5],
				[6,7,8],
				[1,3,6],
				[1,4,7],
				[2,5,8],
				[0,4,8],
				[2,4,6]];
	var over = 0 ;
	var marker = 'x';
	for (var i = 0; i < win_pos.length; i++) {
		over = 0;
		marker = ttt_board[win_pos[0]];
		for(var j=1;j<3;j++){
			if(win_pos[i][j] === win_pos[i][j-1]){
				over = 1;
			}
			else over = 0;
		}
		if(over) break;
	}
	return [over,marker];
}

function valid_position(id){
	if(ttt_board[id]===''){
		return true;
	}
	return false;
}
function update(id){
	ttt_board[id] = player_marker;
	var str = '#'+id.toString();
	$(str).html(player_marker);
}

//Game init

function create_board(rows,cols){
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


function create_a_marker(marker,markers){
	var div = document.createElement('div');
	div.id=marker;
	div.className = "marker";
	div.innerHTML = marker;
	markers.append(div);
}
function create_markers(){
	var markers = $('#markers');
	create_a_marker('x',markers);
	create_a_marker('o',markers);
}
function clear_markers(){
	$('#x').css('display','none');
	$('#o').css('display','none');
}

function select_marker(){
	$('.marker').on('click',function(){
		var id = $(this).attr('id');
		player_marker = id;
		if(player_marker == 'x'){
			ai_marker = 'o';
		}
		else{
			ai_marker = 'x';
		}
		clear_markers();
		start_game(3,3);
	});
}


function start_game(n,m){
	create_board(n,m);
	$('.block').on('click',function(){
		var id = $(this).attr('id');
		if( valid_position(id) ){
			last_move = id;
			update(id);
			// validate();
			ai_next_move();
		}
	});
}
function init(){
	create_markers();
	select_marker();
}
$(document).ready(init);