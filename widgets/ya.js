var li = document.createElement('li');
li.innerHTML = '<a href="https://metrika.yandex.ru/stat/?id=28579491&amp;from=informer" target="_blank" rel="nofollow"><img src="//bs.yandex.ru/informer/28579491/1_1_FFFFFFFF_FFFFFFFF_0_uniques" style="width:80px; height:15px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (уникальные посетители)" onclick="try{Ya.Metrika.informer({i:this,id:28579491,lang:\'ru\'});return false}catch(e){}"/></a>';
document.getElementById('counters').childNodes[0].appendChild(li);

(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter28579491 = new Ya.Metrika({id:28579491,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");
