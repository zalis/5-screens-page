var li = document.createElement('li');
li.innerHTML = '<span id="hotlog_counter"></span><span id="hotlog_dyn"></span>';
document.getElementById('counters').childNodes[0].appendChild(li);

var hot_s = document.createElement('script');
hot_s.type = 'text/javascript'; hot_s.async = true;
hot_s.src = 'http://js.hotlog.ru/dcounter/2479155.js';
hot_d = document.getElementById('hotlog_dyn');
hot_d.appendChild(hot_s);
