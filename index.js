var trackIndex = 0;
const maxIndex = tracks.length - 1;
const vinyl = document.getElementById("vinyl")
const articleDialog = document.getElementById("article-dialog")
const bibDialog = document.getElementById("bib-dialog")

// Volume button functionality
$(document).on('input', '#deck-volume', function() {
    $("#track-audio").prop("volume", $(this).val())
})

// Deck button functionality
function playAnimation() {
    pauseAnimation()
    let timer = setTimeout(function() {
        vinyl.style.animationPlayState = "running"
        $(".album").scrollTop(0)
        $("#track-audio").get(0).play()
    }, 200)
}

function pauseAnimation() {
    vinyl.style.animationPlayState = "paused"
    $("#track-audio").get(0).pause()
}

function parseTrackInfo() {
    let track = tracks[trackIndex], title = track.title.toUpperCase();
    $("#album-cover").attr("src", `${track.img}`)
    $(".article-dialog-img").attr("src", `${track.img}`)
    $("#album-title").text(track.title)
    $(".article-dialog-title").text(track.title)
    $(".deck-screen-text").html(`0${trackIndex}: ${title}`)
    $(".album-article").html(`${track.article}`)
    $(".article-dialog-text").html(`${track.article}`)
    $(".album-bib").html(`${track.bib}`)
    $(".article-dialog-bib").html(`${track.bib}`)
    $("#track-audio").attr("src", `${track.audio}`)
}

$("#deck-play").click(function() {
    playAnimation()
})

$("#deck-pause").click(function() {
    pauseAnimation()
})

$("#deck-next").click(function() {
    if (trackIndex + 1 > maxIndex) trackIndex = 0;
    else trackIndex++;

    parseTrackInfo()   
    playAnimation()
})

$("#deck-prev").click(function() {
    vinyl.style.animationPlayState = "running"
    if (trackIndex == 0) trackIndex = maxIndex;
    else trackIndex--;

    parseTrackInfo()
    playAnimation()
})

// Article dialog functionality
$(".album").click(function() {
    articleDialog.showModal()
    $("#article-dialog").scrollTop(0)
})

$("#article-dialog-close").click(function() {
    articleDialog.close()
})

//Bibliography functionality
$("#bib-btn").click(function() {
    bibDialog.showModal()
})

$("#bib-dialog-close").click(function() {
    bibDialog.close()
})

//Initialize page
$(document).ready(function() {
    parseTrackInfo()
})