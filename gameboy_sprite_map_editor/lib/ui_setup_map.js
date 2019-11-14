

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
        .attr('id','clear_map')
        .attr('type','button')
        .on('click',clear_map)
        .attr('value','clear')

        d3.select('body').append('input')
        .attr('id','export_map')
        .attr('type','button')
        .on('click',export_map)
        .attr('value','export')

        d3.select('body').append('input')
        .attr('id','push_map')
        .attr('type','button')
        .on('click',push_map)
        .attr('value','push')

        d3.select('body').append('input')
        .attr('id','pop_map')
        .attr('type','button')
        .on('click',pop_map)
        .attr('value','pop')


        d3.select('body').append('input')
        .attr('id','cycle_map')
        .attr('type','button')
        .on('click',cycle_map)
        .attr('value','cycle')

    stack_canvas = d3.select('body').append('canvas')
        .attr('id','stack_canvas')



}
