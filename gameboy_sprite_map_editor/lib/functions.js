
function main() {




    add_new_sprite()
    current_sprite_index = current_sprites.length-1

    setup_controls_ui()

    setup_sprite_ui()    

    d3.select('body').append('br')
    d3.select('body').append('br')


    setup_map_ui()




    setup_map_ui_action()
    setup_sprite_ui_action()

    create_popup()

    //get elements for projecting colours and tile graphics to

    sprite_list_canvas = document.getElementById("tiles");
    colour_list_canvas = document.getElementById("colours");
    

    initialize_map()

    //get offsets for laying the canvas for tiles

    call_layout()

    //create map cells  


    //create sprite colour cells
    sprite = current_sprites[current_sprite_index]
    add_new_sprite()
    update_tiles_source()
    d3.select('body').append('br')
    d3.select('body').append('br')

}

function call_layout() {

    map_offset_x = map_edge_selection.node().offsetLeft + 2
    map_offset_y = map_edge_selection.node().offsetTop + 2
    
    sprite_offset_x = sprite_edge_selection.node().offsetLeft + 2
    sprite_offset_y = sprite_edge_selection.node().offsetTop + 2

    current_sprite_canvas.style('top',`${sprite_offset_y}px`)
    current_sprite_canvas.style('left',`${sprite_offset_x}px`)
    current_map_canvas.style('top',`${map_offset_y}px`)
    current_map_canvas.style('left',`${map_offset_x}px`)


}