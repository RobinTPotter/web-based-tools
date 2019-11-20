    
function setup_sprite_ui() {

    sprite_panel = horizontal_panel.append('div').style('float','left').style('margin','10px')

    sprite_panel.append('h2').text('Sprite Design')

    sprite_panel.append('img')
        .attr('id','colours')
        .attr('src','colours.png')
        .attr('width','128')
        .attr('height','32')
        .style('border','solid')
        .style('border-width','1px')

    sprite_panel.append('canvas')
        .attr('width','4')
        .attr('height','32')

    sprite_panel.append('canvas')
        .attr('id','current_colour')
        .attr('width','32')
        .attr('height','32')
        .style('border','dotted')
        .style('border-width','2px')

    

    sprite_panel.append('canvas')
        .attr('id','temp_canvas')
        .attr('width','8')
        .attr('height','8')
        .style('border','solid')
        .style('border-width','2px')
        .style('visibility','hidden')


    sprite_panel.append('canvas')
        .attr('id','temp_canvas_sprite')
        .attr('width','8')
        .attr('height','8')
        .style('border','dotted')
        .style('border-width','1px')
        .style('visibility','hidden')
        
     

    sprite_panel.append('br')
    sprite_panel.append('br')




    sprite_edge_selection = sprite_panel.append('div')
        .attr('id','sprite_edge')
        .style('border','solid')
        .style('border-width','1px')
        .style('width',`${SW * SCHO+2}px`)
        .style('height',`${SH * SCHO+2}px`)
        


        sprite_panel.append('br')
    
    
        tiles_source2 =     sprite_panel
        .append('img')
        .attr('id','tiles2')
        .attr('src','tiles.png')
        .attr('width','160')
        .attr('height','32')
        .style('border','solid')
        .style('border-width','1px')

        sprite_panel.append('hr')

        sprite_panel.append('input')
        .attr('id','new_sprite_button')
        .attr('type','button')
        .on('click',add_new_sprite)
        .attr('value','new')

        sprite_panel.append('input')
        .attr('id','copy_current_sprite')
        .attr('type','button')
        .on('click',copy_current_sprite)
        .attr('value','copy')


        sprite_panel.append('input')
        .attr('id','clear_current_sprite')
        .attr('type','button')
        .on('click',clear_current_sprite)
        .attr('value','clear')

        sprite_panel.append('input')
        .attr('id','delete_current_sprite')
        .attr('type','button')
        .on('click',delete_current_sprite)
        .attr('value','delete')

        sprite_panel.append('input')
        .attr('id','cycle_sprites')
        .attr('type','button')
        .on('click',cycle_sprites)
        .attr('value','cycle')

        
        sprite_panel.append('br')

        sprite_panel.append('input')
        .attr('id','rotate')
        .attr('type','button')
        .on('click',rotate_sprite)
        .attr('value','rotate')

        sprite_panel.append('input')
        .attr('id','flip')
        .attr('type','button')
        .on('click',flip_x_sprite)
        .attr('value','flip')

        sprite_panel.append('input')
        .attr('id','nudgeL')
        .attr('type','button')
        .on('click',nudgeL)
        .attr('value','<nudge')

        sprite_panel.append('input')
        .attr('id','nudgeR')
        .attr('type','button')
        .on('click',nudgeR)
        .attr('value','nudge>')




        sprite_panel.append('br')

        sprite_panel.append('input')
        .attr('id','export_sprites')
        .attr('type','button')
        .on('click',export_sprites)
        .attr('value','export')

    current_sprite_canvas = sprite_panel.append('canvas')
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


        sprite_panel.append('br')

        tes_canvas_3x3 = sprite_panel.append('canvas')
        .attr('id','tes_canvas_3x3')
        .attr('width',`${3 * SW *2}`)
        .attr('height',`${3 * SH *2}`)
        .style('margin','10px')

        sprite_panel.append('br')

        tes_canvas_2x2 = sprite_panel.append('canvas')
        .attr('id','tes_canvas_2x2')
        .attr('width',`${2 * SW*2 }`)
        .attr('height',`${2 * SH *2}`)  

        sprite_panel.append('br')

        sprite_panel.append('input').attr('type','number').attr('min',0).style('width','50px').attr('value',0).on('click',function(){
            tes_sprite_index = Number(d3.select(this).node().value)
            update_tiles_source()
        })

        sprite_panel.append('input')
        .attr('id','dup_sprites')
        .attr('type','button')
        .on('click',dup_sprites)
        .attr('value','dupe')

      


}
