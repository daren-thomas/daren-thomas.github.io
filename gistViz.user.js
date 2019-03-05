// ==UserScript==
// @name         gistViz
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add Viz.js to GitHub gists (if they end in '.gv')
// @author       Daren Thomas
// @match        https://gist.github.com/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// @require https://daren-thomas.github.io/viz.js
// ==/UserScript==

(function() {
    'use strict';
    var FILENAME = "[name='gist[contents][][name]']";
    var gvmode = false;
    var is_edit = $('.blob-wrapper[itemprop=text]').length === 0;

    function set_gvmode() {
        if (!is_edit) {
            gvmode = true;
        }
        else
        {
            var fname = $(FILENAME)[0].value;
            if (typeof fname === 'undefined' || fname === null) {
                gvmode = false;
                console.log('turning GraphViz mode OFF');
                console.log(fname === null);
                console.log(typeof fname === 'undefined');
            }
            else if (fname.endsWith('.gv')) {
                gvmode = true;
                console.log('turning GraphViz mode ON');
            }
            else {
                gvmode = false;
                console.log('turning GraphViz mode OFF');
                console.log(fname);
            }
        }
    }
    set_gvmode();
    if (is_edit) { $( FILENAME ).change(set_gvmode); }

    if ($('#gistViz').length < 1) {
        if (is_edit)
        {
            $('#gist-pjax-container').append('<div id="gistViz" style="margin-top: 2em; margin-left: 7em;"></div>');
        }
        else
        {
            $('div.discussion-timeline').prepend('<div id="gistViz" style="margin-top: 2em; margin-left: 7em;"></div>');
        }
    }

    function draw_gv() {
        if (gvmode) {
            var lines = [];
            if (is_edit) {
                var content_pres = $('pre, .CodeMirror-line');
                content_pres.each(function(i){
                    lines.push($(this).text());
                });
            }
            else {
                var content_trs = $('div[itemprop=text] td.blob-code');
                    content_trs.each(function(i){
                    lines.push($(this).text());                    
                });
            }
            console.log(lines[16]);

            try {
                var rendered = Viz(lines.join('\n'));
                $("div#gistViz").html(rendered);
                $("div#gistViz").css('border', '2px solid green');
            }
            catch(err) {
                $("div#gistViz").html(err);
                $("div#gistViz").css('border', '2px solid red');
            }
        }
    }
    draw_gv();

    if (is_edit)
    {
        var observer = new MutationObserver(draw_gv);
        var config = { childList: true, characterData: true, subtree: true };
        observer.observe($('.CodeMirror-lines')[0], config);
    }
})();