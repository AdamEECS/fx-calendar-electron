const log = console.log.bind(console)

const template = function(news) {
    let t =
        `
        <div class="item-container" data-time-int=${ news.time_int }>
            <div class="event-item row">

                <div>${ news.time_show }</div>
                <div>${ news.title_content }</div>

            </div>

        </div>`
    return t
}

const newsContainer = $('.news-container')

const dataAfter = function(lastTimeInt) {
    let request = {
        url: 'http://localhost:8004/fx/news/after/' + lastTimeInt,
        type: 'get',
        contentType: 'application/json',
        success: function(r) {
            r = JSON.parse(r)
            console.log(r)
            if (r.length === 0) {
                return false
            }
            let newLastTimeInt = r.slice(-1)[0].time_int
            log('newLast', newLastTimeInt)
            newsContainer.data('last-time-int', newLastTimeInt)
            for (let i = 0; i < r.length; i++) {
                let news = r[i]
                let t = template(news)
                $(t).prependTo(newsContainer).hide().slideDown(600)
            }
        },
        error: function(err) {
            log('error', err);
        }
    };
    $.ajax(request)
}

const getNewData = function() {
    let lastTimeInt = newsContainer.data('last-time-int')
    log(lastTimeInt)
    dataAfter(lastTimeInt)
}

let timer = setInterval(function() {
    getNewData()
}, 1000)
