function messageHnadler(e){
	postMessage("worker says:"+e.data);
}

addEventListener("message",messageHnadler,true);