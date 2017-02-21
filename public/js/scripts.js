// Store channel URLs and API key
var fccURL = 'https://api.twitch.tv/kraken/streams/freecodecamp';
var akaadianURL = 'https://api.twitch.tv/kraken/streams/comster404';
var clientID = 'n9gbi2r0lp8k0ub0svfqairm1qnazm';

// Get a channel, update view
var retrieveChannel = function(data, user) {
    var selector = '#' + user + '-link';
    console.log('selector ' + selector);
    var $stream = $(selector + ' .stream-name');
    var $link = $(selector);
    var $is = $(selector + ' .light');
    console.log('user: ' + user);

    $link.attr('href', 'https://www.twitch.tv/' + user);

    if (data['stream'] === null) {
        $stream.text('Offline');
    }
    else if (data['status'] === 404) {
        $('.streamer').text('Channel');
        $stream.text('Closed');
    }
    else {
        $stream.text(data['stream']['game']);
        $is.text('is playing ');
    }
}

// Call for FCC's channel
$.ajax({
    url: fccURL,
    headers: {
        'Client-Id': clientID
    },
    success: function(data) {
        retrieveChannel(data, 'freecodecamp');
    }
});

// Call for Akaadian's channel
$.ajax({
    url: akaadianURL,
    headers: {
        'Client-Id': clientID
    },
    success: function(data) {
        retrieveChannel(data, 'akaadian');
    }
});

function filterChannels(status) {
    var $streams = $('.stream-name');

    if (status === 'online') {
        $.each($streams, function(stream) {
            if (stream.text === 'Offline') {
                stream.parent().hide();
            }
        });
    }

    else if (status === 'offline') {
        $.each($streams, function(stream) {
            if (stream.text !== 'Offline') {
                stream.parent().hide();
            }
        });
    }

    else if (status === 'all') {
        $streams.children().show();
    }
}

$(function() {
    // $('#online').on('click', function(e) {
    //     filterChannels('online');
    //     $('#online').addClass('selected');
    // });
    // $('#offline').on('click', function(e) {
    //     filterChannels('offline');
    //     $('#online').addClass('selected');
    // });
    // $('#all').on('click', function(e) {
    //     filterChannels('all');
    //     $('#online').addClass('selected');
    // });
});
