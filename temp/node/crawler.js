var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.cnblogs.com/ghostwu/';

function filterHtml(html) {
    var $ = cheerio.load(html);
    var arcList = [];
    var aPost = $("#content").find(".post-list-item");
    aPost.each(function () {
        var ele = $(this);
        var title = ele.find("h2 a").text();
        var url = ele.find("h2 a").attr("href");
        ele.find(".c_b_p_desc a").remove();
        var entry = ele.find(".c_b_p_desc").text();
        ele.find("small a").remove();
        var listTime = ele.find("small").text();
        var re = /\d{4}-\d{2}-\d{2}\s*\d{2}[:]\d{2}/;
        listTime = listTime.match(re)[0];
        arcList.push({
            title: title,
            url: url,
            entry: entry,
            listTime: listTime
        });
    });
    return arcList;
}

function nextPage( html ){
    var $ = cheerio.load(html);
    var nextUrl = $("#pager a:last-child").attr('href');
    if ( !nextUrl ) return ;
    var curPage = $("#pager .current").text();
    if( !curPage ) curPage = 1;
    var nextPage = nextUrl.substring( nextUrl.indexOf( '=' ) + 1 );
    if ( curPage < nextPage ) crawler( nextUrl );
}

function crawler(url) {
    http.get(url, function (res) {
        var html = '';
        var arcList = [];
        res.on('data', function (chunk) {
            html += chunk;
        });
        res.on('end', function () {
            arcList = filterHtml(html);
            console.log( arcList );
            nextPage( html );
        });
    });
}
crawler( url );