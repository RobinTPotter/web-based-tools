    
function setup_sprite_ui() {



    d3.select('body').append('img')
        .attr('id','colours')
        .attr('src','colours.png')
        .attr('width','128')
        .attr('height','32')
        .style('border','solid')
        .style('border-width','1px')

        d3.select('body').append('canvas')
        .attr('width','4')
        .attr('height','32')

        d3.select('body').append('canvas')
        .attr('id','current_colour')
        .attr('width','32')
        .attr('height','32')
        .style('border','dotted')
        .style('border-width','2px')

    

        d3.select('body').append('canvas')
        .attr('id','temp_canvas')
        .attr('width','8')
        .attr('height','8')
        .style('border','solid')
        .style('border-width','2px')
        .style('visibility','hidden')


        d3.select('body').append('canvas')
        .attr('id','temp_canvas_sprite')
        .attr('width','8')
        .attr('height','8')
        .style('border','dotted')
        .style('border-width','1px')
        .style('visibility','hidden')
        
        d3.select('body').append('br')
        d3.select('body').append('br')

    sprite_edge_selection = d3.select('body').append('div')
        .attr('id','sprite_edge')
        .style('border','solid')
        .style('border-width','1px')
        .style('width',`${SW * SCHO+2}px`)
        .style('height',`${SH * SCHO+2}px`)
        
    d3.select('body').append('hr')

        d3.select('body').append('input')
        .attr('id','new_sprite_button')
        .attr('type','button')
        .on('click',add_new_sprite)
        .attr('value','new')

        d3.select('body').append('input')
        .attr('id','copy_current_sprite')
        .attr('type','button')
        .on('click',copy_current_sprite)
        .attr('value','copy')


        d3.select('body').append('input')
        .attr('id','clear_current_sprite')
        .attr('type','button')
        .on('click',clear_current_sprite)
        .attr('value','clear')

        d3.select('body').append('input')
        .attr('id','delete_current_sprite')
        .attr('type','button')
        .on('click',delete_current_sprite)
        .attr('value','delete')

        d3.select('body').append('input')
        .attr('id','export_sprites')
        .attr('type','button')
        .on('click',export_sprites)
        .attr('value','export')

    current_sprite_canvas = d3.select('body').append('canvas')
        .attr('id','current_sprite_canvas')
        .attr('width',`${SW * SCHO}`)
        .attr('height',`${SH * SCHO}`)
        .style('position','absolute')
        .on('mousedown', function() {
            event.preventDefault ? event.preventDefault() : event.returnValue = false
            console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
            mx=d3.event.offsetX
            my=d3.event.offsetY
            cx=Math.abs(Math.floor(mx/SCHO))
            cy=Math.abs(Math.floor(my/SCHO))
            cell = current_sprites[current_sprite_index].filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
            console.log(cx,cy,cell)
            cell.value=colour_index
            update_sprite_canvas()            
        })
        .on('mousemove', function() {
            if (d3.event.buttons==1) {
                //console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
                mx=d3.event.offsetX
                my=d3.event.offsetY
                cx=Math.abs(Math.floor(mx/SCHO))
                cy=Math.abs(Math.floor(my/SCHO))
                cell = current_sprites[current_sprite_index].filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
                //console.log(cx,cy,cell)
                cell.value=colour_index
                update_sprite_canvas()       
            }     
        })
        .on('mouseup',function() {
            update_map_canvas()
        })

}

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
    popup_button_area.style('top', `${ main_height - 28 }px`)
    popup_button_area.style('left', `${ margin }px`)


    popup_inside.node().value = stuff
    popup.style('visibility','visible')
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


function setup_map_ui() {

    tiles_source = d3.select('body').append('img')
        .attr('id','tiles')
        .attr('src','tiles.png')
        .attr('width','160')
        .attr('height','32')
        .style('border','solid')
        .style('border-width','1px')

    d3.select('body').append('canvas')
        .attr('width','4')
        .attr('height','32')

    d3.select('body').append('canvas')
        .attr('id','current_tile')
        .attr('width','32')
        .attr('height','32')
        .style('border','dotted')
        .style('border-width','2px')

        d3.select('body').append('br')
        d3.select('body').append('br')

    map_edge_selection = d3.select('body').append('div')
        .attr('id','map_edge')
        .style('border','solid')
        .style('border-width','1px')
        //.style('position','1px')
        .style('width',`${W * CHO+2}px`)
        .style('height',`${H * CHO+2}px`)
        //.style('top',`${offset_y-2}px`)
        //.style('posleftition',`${offset_x-2}`)


    current_map_canvas = d3.select('body').append('canvas')
        .attr('id','current_map_canvas')
        .style('position','absolute')
        .attr('width',`${W * CHO}`)
        .attr('height',`${H * CHO}`)
        .on('mousedown', function() {
            console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
            mx=d3.event.offsetX
            my=d3.event.offsetY
            cx=Math.abs(Math.floor(mx/CHO))
            cy=Math.abs(Math.floor(my/CHO))
            cell = current_map.filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
            console.log(cx,cy,cell)
            cell.value=current_tile_index
            update_map_canvas()            
        })
        .on('mousemove', function() {
            if (d3.event.buttons==1) {
                //console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
                mx=d3.event.offsetX
                my=d3.event.offsetY
                cx=Math.abs(Math.floor(mx/CHO))
                cy=Math.abs(Math.floor(my/CHO))
                cell = current_map.filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
                //console.log(cx,cy,cell)
                cell.value=current_tile_index
                update_map_canvas()       
            }     
        })

        
        d3.select('body').append('hr')
        
        d3.select('body').append('input')
        .attr('id','export_map')
        .attr('type','button')
        .on('click',export_map)
        .attr('value','export')

}
