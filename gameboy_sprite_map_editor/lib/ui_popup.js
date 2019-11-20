
function create_popup() {

    

    popup = d3.select('body').append('div')
        .attr('id','popup')
        .attr('width','200')
        .attr('height','300')
        .style('position','absolute')
        .style('top','100px')
        .style('left','100px')
        .style('border','solid')
        .style('border-width','1px')
        .style('background-color','grey')
        .style('visibility','hidden')
        
    popup_inside = popup.append('textarea')
        .attr('id','popup_inside')
        .style('position','absolute')
        .attr('rows','120')
        .attr('wrap','off')
        .style('top','20px')
        .style('left','20px')
        .style('resize','none')

    //popup_inside_text = popup_inside.append('input').attr('type','textarea').text('no text')

    popup_button_area = popup.append('div')

    popup_ok_button = popup_button_area.append('input')
        .attr('id','dismiss')
        .attr('type','button')
        .on('click', popup_close)
        .attr('value','OK')

    popup_copy_button = popup_button_area.append('input')
            .attr('id','copy')
            .attr('type','button')
            .on('click', popup_copy)
            .attr('value','Copy')

}

function popup_open(stuff) {

    var margin = 30
    var main_width = document.body.clientWidth-margin*2
    var main_height = document.body.clientHeight-margin*2

    popup.style('top', `${ margin }px`)
    popup.style('left', `${ margin }px`)
    popup.style('width', `${main_width}px`)
    popup.style('height', `${main_height}px`)

    popup_inside.style('top', `${ margin }px`)
    popup_inside.style('left', `${ margin }px`)
    popup_inside.style('width', `${main_width - 2*margin}px`)
    popup_inside.style('height', `${main_height - 2*margin}px`)

    popup_button_area.style('position','absolute')
    popup_button_area.style('top', `${ main_height - 27 }px`)
    popup_button_area.style('left', `${ margin }px`)


    popup_inside.node().value = stuff
    popup.style('visibility','visible')
    popup_inside.node().focus()

    popup.node().onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            popup_close()
        }
    };


}

function popup_copy() {
    popup_inside.node().setSelectionRange(0,-1)
    popup_inside.node().focus()
    document.execCommand("copy");
}

function popup_close() {
    popup_inside.node().value = ''
    popup.style('visibility','hidden')
}
