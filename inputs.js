var submit = document.getElementById('btn');
submit.onclick = function(){

  var text = document.getElementById('input').value.toString();

  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
    {
      console.log("request done");
    }
  };
  request.open('POST',"/logs",true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({data:text}));
};
