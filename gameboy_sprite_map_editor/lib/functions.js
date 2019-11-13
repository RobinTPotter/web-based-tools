
function main() {


    add_new_sprite()
    current_sprite_index = current_sprites.length-1


    save_button = d3.select('body').append('input')
        .attr('id','save')
        .attr('type','button')
        .on('click', save)
        .attr('value','save')


        load_button = d3.select('body').append('input')
        .attr('id','load')
        .attr('type','button')
        .on('click', load)
        .attr('value','load')

    notice = d3.select('body').append('span')
        .attr('id','notice')
        .attr('type','button')
        .text('< enabled if ran locally, see README.md')
        .style('visibility','hidden')
        .on('click',function() { d3.select(this).style('visibility','hidden') })

    test(function(d) {
        if (d=='') {
            load_button.node().disabled=true
            save_button.node().disabled=true
            notice.style('visibility', 'visible')
        }
    })

    d3.select('body').append('hr')

    d3.select('body').append('h2').text('Sprite Design')

    setup_sprite_ui()    

    d3.select('body').append('br')
    d3.select('body').append('br')

    d3.select('body').append('h2').text('Map Design')

    setup_map_ui()




    setup_map_ui_action()
    setup_sprite_ui_action()

    create_popup()

    //get elements for projecting colours and tile graphics to

    sprite_list_canvas = document.getElementById("tiles");
    colour_list_canvas = document.getElementById("colours");
    

    //get offsets for laying the canvas for tiles

    map_offset_x = map_edge_selection.node().offsetLeft + 2
    map_offset_y = map_edge_selection.node().offsetTop + 2
    
    sprite_offset_x = sprite_edge_selection.node().offsetLeft + 2
    sprite_offset_y = sprite_edge_selection.node().offsetTop + 2

    initialize_map()

    current_sprite_canvas.style('top',`${sprite_offset_y}px`)
    current_sprite_canvas.style('left',`${sprite_offset_x}px`)
    current_map_canvas.style('top',`${map_offset_y}px`)
    current_map_canvas.style('left',`${map_offset_x}px`)

    //create map cells  


    //create sprite colour cells
    sprite = current_sprites[current_sprite_index]
    add_new_sprite()
    update_tiles_source()

}